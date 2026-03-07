import Time "mo:core/Time";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";


// Specify migration in with clause

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

  // New Types and Storage
  type BlogPostId = Nat;
  type PartnerLeadId = Nat;

  type BlogPost = {
    id : BlogPostId;
    title : Text;
    category : Text;
    excerpt : Text;
    body : Text;
    author : Text;
    readTime : Text;
    publishDate : Text;
    published : Bool;
    timestamp : Int;
  };

  type PartnerLead = {
    id : PartnerLeadId;
    companyName : Text;
    contactName : Text;
    email : Text;
    phone : Text;
    partnershipType : Text;
    description : Text;
    timestamp : Int;
  };

  let blogPostStorage = Map.empty<BlogPostId, BlogPost>();
  var nextBlogPostId = 0;
  let partnerLeadStorage = Map.empty<PartnerLeadId, PartnerLead>();
  var nextPartnerLeadId = 0;

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

  // Wizard Functionality
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

  // BlogPost Functions
  public shared ({ caller }) func createBlogPost(
    title : Text,
    category : Text,
    excerpt : Text,
    body : Text,
    author : Text,
    readTime : Text,
    publishDate : Text,
  ) : async BlogPostId {
    if (title == "") { Runtime.trap("Title cannot be empty") };
    if (body == "") { Runtime.trap("Body cannot be empty") };

    let id = nextBlogPostId;
    let post : BlogPost = {
      id;
      title;
      category;
      excerpt;
      body;
      author;
      readTime;
      publishDate;
      published = false;
      timestamp = Time.now();
    };

    blogPostStorage.add(id, post);
    nextBlogPostId += 1;
    id;
  };

  public shared ({ caller }) func updateBlogPost(
    id : BlogPostId,
    title : Text,
    category : Text,
    excerpt : Text,
    body : Text,
    author : Text,
    readTime : Text,
    publishDate : Text,
  ) : async Bool {
    let post = switch (blogPostStorage.get(id)) {
      case (?post) { post };
      case (null) { Runtime.trap("Invalid post id: " # id.toText()) };
    };

    let updatedPost : BlogPost = {
      id = post.id;
      title;
      category;
      excerpt;
      body;
      author;
      readTime;
      publishDate;
      published = post.published;
      timestamp = Time.now();
    };

    blogPostStorage.add(id, updatedPost);
    true;
  };

  public shared ({ caller }) func publishBlogPost(id : BlogPostId) : async Bool {
    let post = switch (blogPostStorage.get(id)) {
      case (?post) { post };
      case (null) { Runtime.trap("Invalid post id: " # id.toText()) };
    };

    let updatedPost = { post with published = true };
    blogPostStorage.add(id, updatedPost);
    true;
  };

  public shared ({ caller }) func unpublishBlogPost(id : BlogPostId) : async Bool {
    let post = switch (blogPostStorage.get(id)) {
      case (?post) { post };
      case (null) { Runtime.trap("Invalid post id: " # id.toText()) };
    };

    let updatedPost = { post with published = false };
    blogPostStorage.add(id, updatedPost);
    true;
  };

  public shared ({ caller }) func deleteBlogPost(id : BlogPostId) : async Bool {
    switch (blogPostStorage.get(id)) {
      case (null) { Runtime.trap("Invalid post id: " # id.toText()) };
      case (?_) {
        blogPostStorage.remove(id);
        true;
      };
    };
  };

  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPostStorage.values().toArray();
  };

  public query ({ caller }) func getPublishedBlogPosts() : async [BlogPost] {
    let allPosts = blogPostStorage.values().toArray();
    allPosts.filter(func(post) { post.published });
  };

  public query ({ caller }) func getBlogPost(id : BlogPostId) : async ?BlogPost {
    blogPostStorage.get(id);
  };

  // PartnerLead Functions
  public shared ({ caller }) func submitPartnerLead(
    companyName : Text,
    contactName : Text,
    email : Text,
    phone : Text,
    partnershipType : Text,
    description : Text,
  ) : async PartnerLeadId {
    if (companyName == "") { Runtime.trap("Company name cannot be empty") };
    if (contactName == "") { Runtime.trap("Contact name cannot be empty") };
    if (email == "") { Runtime.trap("Email cannot be empty") };
    if (phone == "") { Runtime.trap("Phone cannot be empty") };
    if (partnershipType == "") { Runtime.trap("Partnership type cannot be empty") };
    if (description == "") { Runtime.trap("Description cannot be empty") };

    let id = nextPartnerLeadId;
    let lead : PartnerLead = {
      id;
      companyName;
      contactName;
      email;
      phone;
      partnershipType;
      description;
      timestamp = Time.now();
    };

    partnerLeadStorage.add(id, lead);
    nextPartnerLeadId += 1;
    id;
  };

  public query ({ caller }) func getAllPartnerLeads() : async [PartnerLead] {
    partnerLeadStorage.values().toArray();
  };

  public query ({ caller }) func getTotalPartnerLeads() : async Nat {
    partnerLeadStorage.size();
  };
};
