import Time "mo:core/Time";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";



actor {
  // Contact Form Types and Storage
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

  // Wizard Application Types and Storage
  type WizardApplicationId = Nat;
  type PartialLeadId = Nat;

  type WizardApplication = {
    id : WizardApplicationId;
    industry : Text;
    regulatoryHurdle : Text;
    name : Text;
    email : Text;
    phone : Text;
    businessName : Text;
    fein : Text;
    hasFein : Bool;
    timestamp : Int;
  };

  type PartialLead = {
    id : PartialLeadId;
    email : Text;
    industry : Text;
    regulatoryHurdle : Text;
    timestamp : Int;
  };

  let wizardApplicationStorage = Map.empty<WizardApplicationId, WizardApplication>();
  let partialLeadStorage = Map.empty<PartialLeadId, PartialLead>();
  var nextWizardApplicationId = 0;
  var nextPartialLeadId = 0;

  // Original Contact Form Methods
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

  // New Wizard Functionality
  public shared ({ caller }) func submitWizardApplication(
    industry : Text,
    regulatoryHurdle : Text,
    name : Text,
    email : Text,
    phone : Text,
    businessName : Text,
    fein : Text,
    hasFein : Bool,
  ) : async WizardApplicationId {
    switch (industry, name, email) {
      case ("", _, _) { Runtime.trap("Industry cannot be empty") };
      case (_, "", _) { Runtime.trap("Name cannot be empty") };
      case (_, _, "") { Runtime.trap("Email cannot be empty") };
      case (_, _, _) {};
    };

    let id = nextWizardApplicationId;
    let application : WizardApplication = {
      id;
      industry;
      regulatoryHurdle;
      name;
      email;
      phone;
      businessName;
      fein;
      hasFein;
      timestamp = Time.now();
    };

    wizardApplicationStorage.add(id, application);
    nextWizardApplicationId += 1;
    id;
  };

  public shared ({ caller }) func savePartialLead(
    email : Text,
    industry : Text,
    regulatoryHurdle : Text,
  ) : async PartialLeadId {
    if (email == "") {
      Runtime.trap("Email cannot be empty");
    };

    let id = nextPartialLeadId;
    let lead : PartialLead = {
      id;
      email;
      industry;
      regulatoryHurdle;
      timestamp = Time.now();
    };

    partialLeadStorage.add(id, lead);
    nextPartialLeadId += 1;
    id;
  };

  public query ({ caller }) func getAllWizardApplications() : async [WizardApplication] {
    wizardApplicationStorage.values().toArray();
  };

  public query ({ caller }) func getAllPartialLeads() : async [PartialLead] {
    partialLeadStorage.values().toArray();
  };

  public query ({ caller }) func getTotalWizardApplications() : async Nat {
    wizardApplicationStorage.size();
  };
};
