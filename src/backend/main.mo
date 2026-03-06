import Time "mo:core/Time";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type SubmissionId = Nat;

  type ContactSubmission = {
    id : SubmissionId;
    name : Text;
    email : Text;
    phone : Text;
    businessType : Text;
    message : Text;
    timestamp : Int;
  };

  let submissionStorage = Map.empty<SubmissionId, ContactSubmission>();
  var nextSubmissionId = 0;

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, businessType : Text, message : Text) : async SubmissionId {
    switch (name, email, phone, businessType, message) {
      case ("", _, _, _, _) { Runtime.trap("Name cannot be empty") };
      case (_, "", _, _, _) { Runtime.trap("Email cannot be empty") };
      case (_, _, "", _, _) { Runtime.trap("Phone cannot be empty") };
      case (_, _, _, "", _) { Runtime.trap("Business type cannot be empty") };
      case (_, _, _, _, "") { Runtime.trap("Message cannot be empty") };
      case (_, _, _, _, _) {};
    };

    let id = nextSubmissionId;
    let submission : ContactSubmission = {
      id;
      name;
      email;
      phone;
      businessType;
      message;
      timestamp = Time.now();
    };

    submissionStorage.add(id, submission);
    nextSubmissionId += 1;
    id;
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    submissionStorage.values().toArray();
  };

  public query ({ caller }) func getTotalSubmissions() : async Nat {
    submissionStorage.size();
  };
};
