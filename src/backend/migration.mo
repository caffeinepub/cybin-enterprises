module {
  public func run(old : { nextSubmissionId : Nat; nextWizardApplicationId : Nat; nextPartialLeadId : Nat }) : {
    nextSubmissionId : Nat;
    nextWizardApplicationId : Nat;
    nextPartialLeadId : Nat;
    nextBlogPostId : Nat;
    nextPartnerLeadId : Nat;
  } {
    { old with nextBlogPostId = 0; nextPartnerLeadId = 0 };
  };
};
