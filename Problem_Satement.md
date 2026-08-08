Problem Statement

1. Title

Health Insurance Claim Submission & Tracking Portal

2. Domain

HealthTech / Insurance Technology

3. Who is the user? (2-3 user types, with roles)

- Patient: Registers, logs in, submits insurance claims, uploads medical documents, and tracks claim status.
- Insurance Officer: Reviews submitted claims, verifies documents, updates claim status, and recommends approval or rejection.
- Admin: Manages users, insurance policies, claim categories, and monitors the overall claim processing workflow.

4. What problem are we solving? (3-5 sentences, real-life example)

Many health insurance claims are processed manually, causing delays, paperwork errors, and poor communication between patients and insurance providers. Patients often do not know the current status of their claims and must repeatedly contact the insurance company for updates. This project aims to digitize the entire claim submission and tracking process, making it faster, transparent, and easier to manage. For example, a patient discharged from a hospital can submit a claim online and track each stage of approval without visiting the insurance office.

5. Proposed Solution (what the application will do, feature-wise)

The application will provide secure login for patients, insurance officers, and administrators. Patients can submit new claims, upload hospital bills and prescriptions, and view real-time claim status. Insurance officers can verify documents, review claim details, and update the claim status. Admin users can manage users, insurance policies, claim categories, and generate basic reports.

6. Core Entities / Database Tables (list all, minimum 5)

- Users
- Patients
- InsurancePolicies
- Claims
- ClaimDocuments
- ClaimStatusHistory
- Notifications

7. User Roles & Permissions (minimum 2 distinct roles)

- Admin: Manage users, policies, and claim workflow.
- Insurance Officer: Verify claims and update claim status.
- Patient: Submit claims, upload documents, and track claim progress.

8. Success Criteria

- A patient should be able to submit a claim in under 5 minutes.
- Claim status should be updated in real time.
- Insurance officers should be able to approve or reject claims efficiently.
- All uploaded documents should be securely stored and linked to the corresponding claim.

9. Out of Scope

- Real payment settlement with insurance companies.
- Integration with government health insurance databases.
- Hospital management system integration.
- AI-based fraud detection and automated claim approval in the initial version.

10. Chosen Track

Python (FastAPI)