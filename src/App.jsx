import { useState, useEffect, useCallback } from "react";

const MARVIN_WRONG = "data:image/jpeg;base64,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";

const MARVIN_RIGHT = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABcQERQRDhcUEhQaGBcbIjklIh8fIkYyNSk5UkhXVVFIUE5bZoNvW2F8Yk5QcptzfIeLkpSSWG2grJ+OqoOPko3/2wBDARgaGiIeIkMlJUONXlBejY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY3/wAARCAB4AGcDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDUFOFNFOFSUKKcKaKcKAHCnCminCgQ4U9aYKetMB4FPXimikmljt4GllYKiDJJoAoMPnb6mmBkL7Ay7hztzzXP3+szXMjLCTFCT2+831NP0CbdeugHBQ1NirG/iilooEMFOFNFOFMQ4U4U0U4UAOFKQ+392FLf7RwKQVItAzKvNXl065SK6gjZWG4NG56fiK1LaZLiFZYjlGGRXM+IklvNXWFEP7tBg9sHnNaOn3cenwCFmaQCi4Wubq1zXia/Msv2VD+7j+97t/8AWq3JrEzufJUIuMeprGu7N5Q0ikuT94dzSuhqLMYuWPFb/hq3AMs+eg21gzQSREF1KgnAzW94bMwLq2fJKZA7ZzTYG9RQKKRJEKcKaKcKoBwp4pgp4oGOFK8iwxNI5wqjJpBWP4oaZbSExtiPfhh6nHFAFK8vvNmklA2lzn8BVQT/AC5Pc1XQvKmT3qOZjgKO1RYq5r2su48jI9avINrgjkGuatrp4TkGuhsZ/PtiXXDAZpONilK5Nd6Yt2m5OoH3fWrNnapZ2yxJz3J9TU8IP2Td6DNNUholPQ8D8aEJocDRSA0VZmNFLSClpgKKeKZTxQA8Vm67JAbPyZG+fcGAHUVojqK4W6uZvtkrSMXbec5+tAFrzl+4se1PWhrUS8j0qAzCRl2LtyK07LBJBpNFIzEtyjZYdK07KT5gOgPFSMimUqw4PB/pSwwiF9x+6v8AOpZSRswybE2/wngVEMlwvRAdxqtHPvkVR0Xk0SXarIy4I24OfU1LKL8nJ3DoeaKqxM04G4YUHIFFU5diFHuWAKdSCngVZAmKdRio7iUwQl1Uu3YDvQBKOK4bUohHqFwi9pDXVW167ybZ0ZGY8KwxUdzpVneTvK28SMOSp4z64oHY5WA4PNaFq+GAyPrT7jRpYJisDCX5dwGME81DGsinY8cinuCvNAIu3FyFuAfof0p97MWkWKMk4Az9azpbiMuGbPUYpzzkYVRt3dW6mly3HzJGhHItuhXILnqf6VJEjP8AvNpI7tWLOCUOMHB4Oa2NPvXazCbCSRgknA9KfIluT7RvZF+OTy1BUBgwyMGiqbMYkBLfgKKvmprSxHLVerZqpJGR94fjSmZAuRzWDEsm5TPcZkYjauc4FXFuNh8vHbgnvUGhoeecZxiqqC4HJnUHOc4JquZiR15pBOSoPt0osK5NNbySnIucH3WqzQXUDApNu+hqTzjigzZGDRZDuyJ7yYgeagfb0ZSQwqN5xcL0ZXH8RYkkelLOVdSScN6jvWfJLJBICwyB39amzHdEM0BaQ4OBmpkhzjcSac+DyO9SW455oux2RIsCqOlWEGyMAUBeM0krbU4qRkDyF2wTwKKFXvRQMdEqoA+0Bz39KmwXHA57Gqwb5aWC5fcFTBY561ozNK5bjtZyvRQM8Zal+yun35EUZ96dHK68NICTTnK7RvDEGldlcogt4z/y1P5VCyckI4OOx4qVWiXA+YE+9Ma13ZaCTceu09aWo+UryBl+8CKgkcEYNWfNI49OoNOxG/VAD9KOYnlM/tx0xUsP3hT5ofm3DoeKZFw1IovJyKgm+9ip4z8tQSH5ifSkMTekSb5DhaKo3Molk8vsvY96KtRXUzcn0LSqAPnOPak80RcRqFDdaKKC0rCKZJHwhGR696spJdRrhkDD3OaKKBk8ZR9plhAPt2FO8kCbdFKwDdiKKKCgvIN8Zk24lXrj+IVnLJ70UVLEyYSbl61EV/eHHQ9KKKRJMhwpNZt1ctI5jj4A6n1oopxBjY0OQz4yBgYoooqmSlY//9k=";

const subjects = {
  "Constitutional Law": {
    emoji: "⚖️",
    color: "#7c3aed",
    questions: [
  // === JUDICIAL REVIEW & STRUCTURE ===
  {
    id: 1,
    category: "Judicial Review",
    type: "multiple_choice",
    question: "In Marbury v. Madison, what did Chief Justice Marshall establish?",
    options: [
      "The Supreme Court has the power of judicial review over legislation",
      "The President has absolute immunity for official acts",
      "Congress has plenary police power",
      "States can nullify federal laws"
    ],
    answer: 0,
    explanation: "Marbury v. Madison established that the Supreme Court has judicial review — the power to declare laws unconstitutional. Marshall called it 'the province and duty of the judicial department to say what the law is.'"
  },
  {
    id: 2,
    category: "Judicial Review",
    type: "multiple_choice",
    question: "Why did Marbury ultimately lose his case despite having a right to his commission?",
    options: [
      "The President had discretion to withhold the commission",
      "The statute expanding the Supreme Court's original jurisdiction was unconstitutional",
      "Marbury failed to file his claim in time",
      "The commission was never properly signed"
    ],
    answer: 1,
    explanation: "The Court found that the statute granting the Supreme Court original jurisdiction to issue writs of mandamus conflicted with Article III's limits on original jurisdiction, making the statute unconstitutional."
  },
  {
    id: 3,
    category: "Judicial Review",
    type: "true_false",
    question: "Martin v. Hunter's Lessee established that the Supreme Court can review state court interpretations of federal law.",
    answer: 0,
    explanation: "Martin v. Hunter's Lessee established the Supreme Court's appellate jurisdiction over state courts on questions of federal law, ensuring uniformity in constitutional interpretation."
  },
  {
    id: 4,
    category: "Judicial Review",
    type: "multiple_choice",
    question: "The 'Countermajoritarian Difficulty' (Alexander Bickel) refers to:",
    options: [
      "The problem of states overriding federal law",
      "Why 9 unelected judges should be able to override the will of the elected majority",
      "The difficulty of amending the Constitution",
      "The challenge of enforcing judicial decisions without an army"
    ],
    answer: 1,
    explanation: "Bickel's Countermajoritarian Difficulty asks why unelected, life-tenured judges should have the power to prevent a majority of Americans from enacting laws through their elected representatives."
  },
  {
    id: 5,
    category: "Judicial Review",
    type: "multiple_choice",
    question: "In Cooper v. Aaron, the Court expanded judicial review by holding that:",
    options: [
      "Only parties to a case are bound by Supreme Court decisions",
      "The Supreme Court's constitutional interpretations are binding on all actors, including non-parties",
      "States can delay compliance with Supreme Court orders for safety reasons",
      "The President can override Supreme Court decisions through executive orders"
    ],
    answer: 1,
    explanation: "Cooper v. Aaron went beyond Marbury by declaring that the Supreme Court's interpretations of the Constitution are supreme and binding on all government actors — parties and non-parties alike."
  },
  {
    id: 6,
    category: "Judicial Review",
    type: "multiple_choice",
    question: "'Departmentalism' is the view that:",
    options: [
      "Only the judiciary can interpret the Constitution",
      "All three branches can interpret the Constitution",
      "Constitutional interpretation belongs solely to Congress",
      "Each department of government operates independently without checks"
    ],
    answer: 1,
    explanation: "Departmentalism holds that all branches of government — not just the judiciary — have the power to interpret the Constitution. This is the opposite of judicial exclusivity."
  },

  // === FEDERALISM & ENUMERATED POWERS ===
  {
    id: 7,
    category: "Federalism",
    type: "multiple_choice",
    question: "McCulloch v. Maryland answered two key questions. The first was whether Congress had power to create a national bank. What was the second?",
    options: [
      "Whether the President could veto the bank's charter",
      "Whether Maryland could tax the national bank",
      "Whether the bank could issue its own currency",
      "Whether states could create competing banks"
    ],
    answer: 1,
    explanation: "McCulloch addressed (1) Congress's power to create the bank (yes, via implied powers and Necessary & Proper Clause) and (2) whether Maryland could tax it (no — 'the power to tax is the power to destroy')."
  },
  {
    id: 8,
    category: "Federalism",
    type: "true_false",
    question: "The federal government is a government of enumerated powers, while state governments have plenary/police power.",
    answer: 0,
    explanation: "This is a foundational principle. The federal government can only act pursuant to powers enumerated in the Constitution (plus implied powers), while states have broad police power to regulate for health, safety, welfare, and morals."
  },
  {
    id: 9,
    category: "Federalism",
    type: "multiple_choice",
    question: "Marshall's statement 'it is a constitution we are expounding' in McCulloch means:",
    options: [
      "The Constitution should be read narrowly like a statute",
      "The Constitution is a flexible document that should be read expansively",
      "Constitutional interpretation should be left to Congress",
      "The Constitution cannot be changed without a formal amendment"
    ],
    answer: 1,
    explanation: "Marshall argued the Constitution is different from an ordinary statute — it must be flexible and read expansively to adapt to changing circumstances, which supports broader congressional power."
  },
  {
    id: 10,
    category: "Federalism",
    type: "multiple_choice",
    question: "In McCulloch, the Court interpreted 'necessary' in the Necessary and Proper Clause to mean:",
    options: [
      "Absolutely essential and indispensable",
      "Required by the text of the Constitution",
      "Essential OR helpful/convenient",
      "Only what the Founders specifically intended"
    ],
    answer: 2,
    explanation: "The Court rejected the narrow reading of 'necessary' as 'absolutely essential.' Instead, Marshall read it as meaning 'essential OR helpful,' noting that Article I, Section 10 uses 'absolutely necessary' — if the Framers had meant that here, they would have said so."
  },

  // === COMMERCE CLAUSE ===
  {
    id: 11,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "Which Commerce Clause theory holds that even if an activity isn't commerce itself, its connection to what happens before and after makes it regulable?",
    options: [
      "Direct Effects test",
      "Stream of Commerce theory",
      "Substantial Effects test",
      "No Aggregation principle"
    ],
    answer: 1,
    explanation: "The Stream of Commerce theory broadens Congress's power by treating activities as part of commerce if they occur between interstate commercial steps — like making steaks between receiving cattle and shipping the product."
  },
  {
    id: 12,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "Which Commerce Clause tests did Wickard v. Filburn eliminate?",
    options: [
      "Stream of Commerce and Motive tests",
      "Direct Effects and No Aggregation tests",
      "Commerce definition and Substantial Effects tests",
      "Motive and Stream of Commerce tests"
    ],
    answer: 1,
    explanation: "Wickard eliminated the Direct Effects test (local activity CAN be regulated if it has substantial effects) and the No Aggregation test (creating the 'Wickard Aggregation Effect' — aggregating all similar actors nationwide)."
  },
  {
    id: 13,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "After Wickard, which Commerce Clause test(s) survived?",
    options: [
      "Only the Commerce definition test",
      "Substantial Effects test and Wickard Aggregation Effect",
      "Direct Effects and No Aggregation",
      "Stream of Commerce and Motive tests"
    ],
    answer: 1,
    explanation: "After Wickard, only the Substantial Effects test and the Wickard Aggregation Effect remained. This gave Congress an incredibly expansive commerce power — leading the Court to stop challenging Congress on commerce for decades."
  },
  {
    id: 14,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "Darby did away with which test regarding Congress's Commerce Clause power?",
    options: [
      "The Substantial Effects test",
      "The Motive test — Congress's motive for regulation no longer matters",
      "The Stream of Commerce test",
      "The No Aggregation test"
    ],
    answer: 1,
    explanation: "Darby eliminated the Motive test. Congress's purpose for regulating doesn't matter — regulation of commerce can be a means to achieve other ends. Darby also said the 10th Amendment is merely 'a truism.'"
  },
  {
    id: 15,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "In U.S. v. Lopez, the Court identified three categories Congress may regulate under the Commerce Clause. Which is NOT one of them?",
    options: [
      "Channels of interstate commerce",
      "Instrumentalities, persons, or things in interstate commerce",
      "Activities that substantially affect interstate commerce",
      "Activities with any indirect connection to interstate commerce"
    ],
    answer: 3,
    explanation: "Lopez established three categories: (1) channels, (2) instrumentalities/persons/things, and (3) activities with a substantial relation to interstate commerce. The 'any indirect connection' standard was the pre-New Deal approach the Court rejected."
  },
  {
    id: 16,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "Lopez introduced what new requirement that limited the Substantial Effects test?",
    options: [
      "The underlying activity being regulated must be economic in nature",
      "Congress must have unanimous approval for the regulation",
      "The regulation must involve international commerce",
      "The President must sign a separate commerce finding"
    ],
    answer: 0,
    explanation: "Lopez held that under Category 3 (substantial effects), the regulated activity must be economic. A gun near a school zone was not economic activity, so Congress could not regulate it under the Commerce Clause."
  },
  {
    id: 17,
    category: "Commerce Clause",
    type: "true_false",
    question: "In Gonzales v. Raich, the Court held that Congress CANNOT prohibit the local, noncommercial growing and use of marijuana.",
    answer: 1,
    explanation: "False. In Raich, the Court upheld Congress's power to prohibit local, noncommercial marijuana cultivation as part of the broader Controlled Substances Act regulatory scheme. Scalia concurred, grounding the power in the Necessary and Proper Clause."
  },
  {
    id: 18,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "In Heart of Atlanta Motel v. United States, why did the Court use the Commerce Clause rather than the Equal Protection Clause to uphold the Civil Rights Act?",
    options: [
      "The Equal Protection Clause only applies to state action, not private businesses",
      "The Commerce Clause was easier to amend",
      "The Equal Protection Clause had been repealed",
      "The hotel was on federal land"
    ],
    answer: 0,
    explanation: "The 14th Amendment's Equal Protection Clause begins with 'no state shall' — it applies to state action, not private citizens. Since the Civil Rights Cases (1883) limited Congress's power under the 14th Amendment against private actors, the Commerce Clause provided the constitutional basis."
  },
  {
    id: 19,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "In Morrison (Violence Against Women Act), the Court struck down the law despite detailed congressional findings. What was the key reason?",
    options: [
      "Gender-based violence is not economic activity",
      "Congress failed to include a jurisdictional element",
      "The law violated the First Amendment",
      "The findings were fabricated"
    ],
    answer: 0,
    explanation: "Despite detailed congressional findings about the effects of gender-based violence on commerce, the Court held that the underlying activity was not economic, applying the Lopez framework. The Court — not Congress — decides the federal-state line."
  },

  // === SPENDING POWER & 10TH AMENDMENT ===
  {
    id: 20,
    category: "Spending Power",
    type: "multiple_choice",
    question: "Under South Dakota v. Dole, which is NOT one of the requirements for Congress's conditional spending?",
    options: [
      "Spending must be for the general welfare",
      "Conditions must be clear and unambiguous",
      "Conditions must be related to a federal interest",
      "States must unanimously consent to the conditions"
    ],
    answer: 3,
    explanation: "The Dole test requires: (1) for the general welfare, (2) clear and unambiguous conditions, (3) conditions related to a federal interest, and (4) no other constitutional bar. There is no unanimity requirement."
  },
  {
    id: 21,
    category: "Spending Power",
    type: "multiple_choice",
    question: "In NFIB v. Sebelius (the Medicaid case), why did the Court strike down the Medicaid expansion?",
    options: [
      "The expansion wasn't related to healthcare",
      "Congress was essentially coercing states — a 'gun to the head' — by threatening to withdraw existing Medicaid funding",
      "The expansion violated the Equal Protection Clause",
      "Medicaid itself was unconstitutional"
    ],
    answer: 1,
    explanation: "The Court found the Medicaid expansion coercive because states would lose ALL existing Medicaid funding (about 22% of state budgets) if they refused to expand. This crossed the line from incentive to coercion — unlike Dole's 5% highway funding."
  },
  {
    id: 22,
    category: "Commandeering",
    type: "multiple_choice",
    question: "New York v. United States established that Congress cannot:",
    options: [
      "Offer states financial incentives",
      "Commandeer state legislatures by ordering them to regulate according to federal instructions",
      "Preempt state law with federal law",
      "Tax state government activities"
    ],
    answer: 1,
    explanation: "New York v. U.S. established the anti-commandeering doctrine: Congress cannot force state legislatures to enact or administer a federal regulatory program. But Congress CAN use spending power incentives, give states a choice between regulation options, or preempt state law."
  },
  {
    id: 23,
    category: "Commandeering",
    type: "true_false",
    question: "Under Printz v. United States, Congress cannot commandeer state executive officials to carry out federal programs.",
    answer: 0,
    explanation: "Printz extended the anti-commandeering doctrine from state legislatures (New York v. U.S.) to state executive officials. Congress cannot direct state law enforcement to implement federal background check requirements."
  },
  {
    id: 24,
    category: "Federalism",
    type: "multiple_choice",
    question: "In Garcia v. San Antonio Metropolitan Transit Authority, the Court held that:",
    options: [
      "The 'traditional government function' test effectively protects state sovereignty",
      "The 'traditional government function' test is unworkable and states are protected by the political process instead",
      "The 10th Amendment grants states absolute sovereignty",
      "Congress has no power to regulate state employees"
    ],
    answer: 1,
    explanation: "Garcia overruled National League of Cities, finding the 'traditional government function' test unworkable. Instead, the political process — not courts — should protect state sovereignty. Justice Blackmun was the key switch vote."
  },

  // === SEPARATION OF POWERS ===
  {
    id: 25,
    category: "Separation of Powers",
    type: "multiple_choice",
    question: "Justice Jackson's concurrence in Youngstown created three zones of presidential power. In which zone does the President have the LEAST power?",
    options: [
      "Zone 1: Acting with congressional authorization",
      "Zone 2: The 'Twilight Zone' where Congress is silent",
      "Zone 3: Acting against Congress's express or implied will",
      "Zone 4: Acting in foreign affairs"
    ],
    answer: 2,
    explanation: "Jackson's Zone 3 — where the President acts incompatibly with Congress's will — is where presidential power is at its 'lowest ebb.' The Youngstown steel seizure fell in this zone because Congress had specifically declined to authorize such seizures."
  },
  {
    id: 26,
    category: "Separation of Powers",
    type: "multiple_choice",
    question: "In Youngstown, Truman's seizure of the steel mills was held unconstitutional primarily because:",
    options: [
      "The steel mills were foreign-owned",
      "Congress had specifically declined to grant seizure authority, and the President's commander-in-chief power didn't extend to domestic industry",
      "The Korean War had not been formally declared",
      "The workers consented to the seizure"
    ],
    answer: 1,
    explanation: "The Court held Truman lacked authority because Congress had rejected granting seizure power, the Commander-in-Chief role didn't extend to domestic steel mills, and the Take Care Clause only authorizes enforcing existing laws — not making new ones."
  },
  {
    id: 27,
    category: "Separation of Powers",
    type: "multiple_choice",
    question: "The Unitary Executive Theory holds that:",
    options: [
      "Congress controls all executive officers",
      "The President has sole control over the executive branch and can remove officers at will",
      "Executive power is shared equally among Cabinet members",
      "The judiciary supervises executive branch operations"
    ],
    answer: 1,
    explanation: "The Unitary Executive Theory, dominant today after Seila Law, holds that executive power is vested in the President alone, who must be able to remove executive officers to fulfill the Take Care Clause duties."
  },
  {
    id: 28,
    category: "Separation of Powers",
    type: "multiple_choice",
    question: "In Trump v. United States, the Court created a three-tier framework for presidential immunity. Which tier provides absolute immunity?",
    options: [
      "All official acts while in office",
      "Conclusive and preclusive constitutional powers of the President",
      "Acts within the outer perimeter of presidential responsibility",
      "Campaign-related activities"
    ],
    answer: 1,
    explanation: "The framework: (1) Absolute immunity for conclusive/preclusive constitutional powers, (2) Presumptive immunity for acts within the outer perimeter of responsibility, (3) No immunity for unofficial acts. The Court also barred juries from considering official acts."
  },
  {
    id: 29,
    category: "Separation of Powers",
    type: "multiple_choice",
    question: "In the 'Decision of 1789,' Madison's position on removal power was that:",
    options: [
      "Only impeachment could remove officers",
      "The Senate should play a role in removal",
      "The President must be able to fire people because executive power is vested in the President",
      "Congress gets to allocate removal power through the Necessary and Proper Clause"
    ],
    answer: 2,
    explanation: "Madison argued (Camp 3) that because the Vesting Clause places executive power in the President, and the Take Care Clause requires faithful execution of laws, the President needs the power to remove executive officers."
  },

  // === CONSTITUTIONAL INTERPRETATION ===
  {
    id: 30,
    category: "Interpretation",
    type: "multiple_choice",
    question: "Which theory of constitutional interpretation holds that the Constitution's meaning changes as society evolves?",
    options: [
      "Originalism",
      "Textualism",
      "Living Constitutionalism",
      "Positivism"
    ],
    answer: 2,
    explanation: "Living Constitutionalism (associated with Thurgood Marshall) holds that the Constitution's meaning evolves with society. This contrasts with Originalism (associated with Scalia), which seeks to fix meaning at the time of ratification."
  },
  {
    id: 31,
    category: "Interpretation",
    type: "multiple_choice",
    question: "The 'dead hand' theory critique argues:",
    options: [
      "The Constitution should be interpreted by judges, not legislators",
      "Past generations should not dictate how present generations are governed",
      "The framers deliberately left the Constitution vague",
      "Constitutional amendments are too difficult to pass"
    ],
    answer: 1,
    explanation: "The 'dead hand' critique questions why people who lived centuries ago should control present governance. Living constitutionalists use this to argue for evolving interpretation, while originalists respond that the amendment process exists for change."
  },
  {
    id: 32,
    category: "Interpretation",
    type: "multiple_choice",
    question: "Compatibilism in constitutional interpretation holds that:",
    options: [
      "The Constitution should only be interpreted by its original meaning",
      "We should interpret the document historically but apply it taking into account today's realities",
      "All interpretive methods are equally invalid",
      "Only the text matters, never history or policy"
    ],
    answer: 1,
    explanation: "Compatibilism bridges originalism and living constitutionalism: interpret the document historically, then apply those principles accounting for modern realities. This avoids the extremes of both approaches."
  },
  {
    id: 33,
    category: "Interpretation",
    type: "multiple_choice",
    question: "Iredell's position (positivism) in Calder v. Bull was that:",
    options: [
      "Natural rights exist beyond what's written in the Constitution",
      "The Constitution is the written document and nothing more",
      "Judges should interpret the Constitution based on moral principles",
      "The Constitution should change with the times"
    ],
    answer: 1,
    explanation: "Iredell took the positivist view: the Constitution is the text and nothing more. This contrasted with Chase's natural law view that there are rights beyond the written document — setting up a debate that persists today."
  },

  // === INDIVIDUAL RIGHTS & INCORPORATION ===
  {
    id: 34,
    category: "Individual Rights",
    type: "multiple_choice",
    question: "Barron v. Baltimore held that the Bill of Rights:",
    options: [
      "Applies to both state and federal governments",
      "Applies only to the federal government, not the states",
      "Is merely advisory and non-binding",
      "Can be overridden by state constitutions"
    ],
    answer: 1,
    explanation: "Barron held that the Bill of Rights restricts only the federal government, not the states. This was later changed through the doctrine of incorporation under the 14th Amendment's Due Process Clause."
  },
  {
    id: 35,
    category: "Individual Rights",
    type: "multiple_choice",
    question: "Selective Incorporation (the modern framework) holds that:",
    options: [
      "All of the Bill of Rights applies to the states",
      "None of the Bill of Rights applies to the states",
      "Rights that are historically part of our system of justice and necessary to it are incorporated against the states through the 14th Amendment",
      "Only the First Amendment applies to the states"
    ],
    answer: 2,
    explanation: "Selective Incorporation (Brennan's approach, now dominant) incorporates most — but not all — Bill of Rights protections against the states through the 14th Amendment's Due Process Clause. Exceptions include the grand jury requirement and quartering of soldiers."
  },
  {
    id: 36,
    category: "Individual Rights",
    type: "multiple_choice",
    question: "Justice Black's 'Total Incorporation' theory held that:",
    options: [
      "Only selected rights apply to the states",
      "All of the Bill of Rights (Amendments 1-8) apply to the states, but only those enumerated rights",
      "Natural rights beyond the text should also be incorporated",
      "The Bill of Rights applies only to the federal government"
    ],
    answer: 1,
    explanation: "Black's Total Incorporation was textualist: ALL of the Bill of Rights (1-8) apply to the states, but ONLY those listed rights — no unenumerated rights. This was ultimately rejected in favor of Selective Incorporation."
  },
  {
    id: 37,
    category: "Individual Rights",
    type: "true_false",
    question: "Reverse incorporation refers to the 5th Amendment's Due Process Clause being used to apply Equal Protection principles against the federal government.",
    answer: 0,
    explanation: "Since the Equal Protection Clause of the 14th Amendment applies only to states ('no state shall'), the Court used the 5th Amendment's Due Process Clause to apply equal protection principles against the federal government — as in Bolling v. Sharpe."
  },

  // === SLAVERY & RECONSTRUCTION ===
  {
    id: 38,
    category: "Reconstruction",
    type: "multiple_choice",
    question: "Dred Scott v. Sandford held that:",
    options: [
      "Enslaved people were citizens with full rights",
      "The Missouri Compromise was constitutional",
      "Black Americans could not be citizens, and Congress could not abolish slavery without a constitutional amendment",
      "States had the power to free enslaved people crossing their borders"
    ],
    answer: 2,
    explanation: "Dred Scott held that Black Americans (free or enslaved) could not be citizens, the Missouri Compromise was unconstitutional (depriving citizens of property under the 5th Amendment), and Congress could not abolish slavery short of an amendment."
  },
  {
    id: 39,
    category: "Reconstruction",
    type: "multiple_choice",
    question: "The Slaughterhouse Cases effectively destroyed which constitutional provision?",
    options: [
      "The Commerce Clause",
      "The Privileges and Immunities Clause of the 14th Amendment",
      "The Equal Protection Clause",
      "The Necessary and Proper Clause"
    ],
    answer: 1,
    explanation: "Slaughterhouse drew a distinction between rights of U.S. citizenship and state citizenship, gutting the Privileges and Immunities Clause. Historians believe this clause was meant to be the primary vehicle for protecting fundamental rights."
  },
  {
    id: 40,
    category: "Reconstruction",
    type: "multiple_choice",
    question: "The Civil Rights Cases (1883) held that the 14th Amendment does NOT empower Congress to:",
    options: [
      "Regulate state governments",
      "Regulate the conduct of private citizens",
      "Pass any civil rights legislation",
      "Enforce the Equal Protection Clause against states"
    ],
    answer: 1,
    explanation: "The Court held that the 14th Amendment's 'no state shall' language means Congress can only regulate STATE action, not private discrimination. This is why later civil rights laws relied on the Commerce Clause instead."
  },
  {
    id: 41,
    category: "Reconstruction",
    type: "true_false",
    question: "The 13th Amendment, unlike the 14th, has no state action requirement.",
    answer: 0,
    explanation: "The 13th Amendment directly prohibits slavery — it does not require state action. However, in the Civil Rights Cases, the Court held it couldn't be stretched to cover all forms of discrimination because that would make Congress's power too broad."
  },

  // === EQUAL PROTECTION: RACE ===
  {
    id: 42,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "Plessy v. Ferguson established what doctrine?",
    options: [
      "Colorblind constitution",
      "Separate but equal",
      "Strict scrutiny for racial classifications",
      "De facto segregation is unconstitutional"
    ],
    answer: 1,
    explanation: "Plessy upheld racial segregation under the 'separate but equal' doctrine, using a deferential reasonableness standard. Justice Harlan famously dissented that 'the Constitution is colorblind.'"
  },
  {
    id: 43,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "Brown v. Board of Education overruled Plessy primarily on what grounds?",
    options: [
      "Historical evidence proved the framers intended integration",
      "Segregation in public education is inherently unequal due to the stigma it creates",
      "The Commerce Clause required integrated schools",
      "Plessy was based on incorrect statistical data"
    ],
    answer: 1,
    explanation: "Brown held that segregation in public education generates a feeling of inferiority that affects children's motivation to learn — 'separate educational facilities are inherently unequal.' The Court used a living constitution approach, focusing on the importance of education today."
  },
  {
    id: 44,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "Brown II ordered desegregation:",
    options: [
      "Immediately, within 30 days",
      "With 'all deliberate speed' — no firm deadline",
      "Only in Southern states",
      "Only for high schools, not elementary schools"
    ],
    answer: 1,
    explanation: "Brown II's 'all deliberate speed' language was intentionally vague and set no deadline. Enforcement was left to district courts. The result was massive resistance, token compliance, and some states closing public schools entirely."
  },
  {
    id: 45,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "Shelley v. Kraemer held that racially restrictive covenants are:",
    options: [
      "Unconstitutional on their face",
      "Enforceable only between willing parties",
      "Not unconstitutional themselves, but judicial enforcement of them constitutes state action violating the Equal Protection Clause",
      "Only enforceable in Southern states"
    ],
    answer: 2,
    explanation: "The covenants themselves weren't unconstitutional (private action), but when courts enforce them, that constitutes state action — meeting the 14th Amendment's 'no state shall' requirement. This was a very realist opinion."
  },
  {
    id: 46,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "In Loving v. Virginia, the Court applied what standard of review to Virginia's ban on interracial marriage?",
    options: [
      "Rational basis review",
      "Intermediate scrutiny",
      "Strict scrutiny — racial classifications require the most rigid scrutiny",
      "No standard was applied"
    ],
    answer: 2,
    explanation: "Loving applied strict scrutiny to racial classifications, requiring a compelling government interest and narrow tailoring. The Court found Virginia's claim of 'racial integrity' was just a cover for white supremacy."
  },
  {
    id: 47,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "Washington v. Davis held that to trigger strict scrutiny under the Equal Protection Clause, a plaintiff must show:",
    options: [
      "Disparate impact alone is sufficient",
      "Discriminatory intent — disparate impact alone is not enough",
      "Statistical evidence of unequal outcomes",
      "A history of discrimination in the jurisdiction"
    ],
    answer: 1,
    explanation: "Washington v. Davis established that mere disparate impact does not trigger strict scrutiny. Discriminatory intent or a facial racial classification is required. Without intent, only rational basis review applies."
  },
  {
    id: 48,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "The anti-classification approach to equal protection holds that:",
    options: [
      "Government should consider race to remedy past discrimination",
      "Any racial classification by government is presumptively wrong — the government should be colorblind",
      "Classifications are acceptable if they help subordinated groups",
      "Only intentional discrimination against minorities should be scrutinized"
    ],
    answer: 1,
    explanation: "Anti-classification (also called colorblindness) holds that all racial classifications are presumptively unconstitutional, regardless of whether they help or hurt minorities. This is the dominant position today after SFFA."
  },

  // === AFFIRMATIVE ACTION ===
  {
    id: 49,
    category: "Affirmative Action",
    type: "multiple_choice",
    question: "In Grutter v. Bollinger, the Court upheld Michigan Law School's affirmative action program because:",
    options: [
      "Racial quotas are always constitutional",
      "Diversity in higher education is a compelling interest, and holistic, individualized review is narrowly tailored",
      "The Commerce Clause authorized it",
      "The school had a judicial finding of past discrimination"
    ],
    answer: 1,
    explanation: "Grutter upheld affirmative action in higher education, finding diversity a compelling interest (from Bakke). The law school's holistic review — considering race as one factor among many without quotas — was narrowly tailored."
  },
  {
    id: 50,
    category: "Affirmative Action",
    type: "multiple_choice",
    question: "In SFFA v. Harvard (2023), the Court effectively ended affirmative action by finding that Harvard's program:",
    options: [
      "Used racial quotas",
      "Failed because its diversity goals were too amorphous, unmeasurable, and involved racial stereotyping",
      "Violated the Commerce Clause",
      "Was not authorized by Congress"
    ],
    answer: 1,
    explanation: "SFFA raised the bar on compelling interest (must be measurable), held that race can never be only a positive factor (zero-sum), and found the admissions process engaged in stereotyping. Grutter was not explicitly overruled but was effectively gutted."
  },
  {
    id: 51,
    category: "Affirmative Action",
    type: "true_false",
    question: "SFFA v. Harvard explicitly overruled Grutter v. Bollinger.",
    answer: 1,
    explanation: "False — SFFA did NOT explicitly overrule Grutter. The Court distinguished it and raised the bar so high that affirmative action as practiced became unworkable, but Grutter technically remains precedent."
  },
  {
    id: 52,
    category: "Affirmative Action",
    type: "multiple_choice",
    question: "In Parents Involved, whose opinion controls?",
    options: [
      "Roberts's plurality opinion",
      "Kennedy's concurrence — as the narrower opinion in a plurality",
      "Breyer's dissent",
      "Thomas's concurrence"
    ],
    answer: 1,
    explanation: "With no majority, Kennedy's concurrence controls as the narrowest ground. Kennedy allowed race-conscious policies (like school siting and redistricting) but not individual race-based assignments."
  },

  // === SUBSTANTIVE DUE PROCESS ===
  {
    id: 53,
    category: "Due Process",
    type: "multiple_choice",
    question: "Lochner v. New York struck down a maximum hours law for bakers on what basis?",
    options: [
      "The Commerce Clause didn't authorize it",
      "The law violated a fundamental right to contract found in the 14th Amendment's Due Process Clause",
      "The law violated the Equal Protection Clause",
      "The state lacked police power"
    ],
    answer: 1,
    explanation: "Lochner found an unenumerated right to contract in the 14th Amendment's Due Process Clause (substantive due process). The Court held the bakery hours law was really a labor regulation, not a legitimate health measure."
  },
  {
    id: 54,
    category: "Due Process",
    type: "multiple_choice",
    question: "The Lochner Court identified two problems with the maximum hours law:",
    options: [
      "Federalism and the Supremacy Clause",
      "Paternalism (bakers can take care of themselves) and redistribution (taking from employers to give to employees)",
      "Free speech and assembly concerns",
      "Lack of congressional authorization and presidential approval"
    ],
    answer: 1,
    explanation: "Lochner's majority had two objections: (1) Paternalism — bakers are 'sui juris' and don't need protection, and (2) Redistribution — the law takes from employers (or other workers) and gives to the regulated workers."
  },
  {
    id: 55,
    category: "Due Process",
    type: "multiple_choice",
    question: "In West Coast Hotel v. Parrish (1937), the Court upheld a minimum wage law for women, effectively ending the Lochner era by:",
    options: [
      "Holding that freedom of contract is not in the Constitution and recognizing women's unequal bargaining power",
      "Finding that women are biologically different from men",
      "Declaring the 14th Amendment applies only to race",
      "Ruling that the 19th Amendment eliminated all sex-based differences"
    ],
    answer: 0,
    explanation: "West Coast Hotel took a realist view: freedom of contract isn't in the Constitution, and women have unequal market bargaining power. This overruled Adkins and marked the end of Lochner-era economic substantive due process."
  },
  {
    id: 56,
    category: "Due Process",
    type: "multiple_choice",
    question: "Williamson v. Lee Optical is significant because the Court:",
    options: [
      "Applied strict scrutiny to economic regulation",
      "Used 'might have' and 'may have' language, deferring entirely to the legislature under rational basis review",
      "Struck down the optical regulation as unreasonable",
      "Required the legislature to provide factual findings"
    ],
    answer: 1,
    explanation: "Lee Optical represents the modern approach: the Court uses 'might/may have concluded' language, fully deferring to the legislature. The Court has not struck down a law for economic substantive due process since 1936."
  },

  // === STANDARDS OF REVIEW ===
  {
    id: 57,
    category: "Standards of Review",
    type: "multiple_choice",
    question: "Under strict scrutiny, the government must show:",
    options: [
      "A legitimate interest and rationally related means",
      "An important interest and substantially related means",
      "A compelling interest and narrowly tailored means",
      "Any rational basis for the classification"
    ],
    answer: 2,
    explanation: "Strict scrutiny (applied to racial classifications and fundamental rights) requires a compelling government interest and narrowly tailored means — the highest level of review."
  },
  {
    id: 58,
    category: "Standards of Review",
    type: "multiple_choice",
    question: "Intermediate scrutiny applies to classifications based on:",
    options: [
      "Race and national origin",
      "Sex/gender",
      "Economic activity",
      "Age and disability"
    ],
    answer: 1,
    explanation: "Intermediate scrutiny (from Craig v. Boren) applies to sex-based classifications, requiring an important government interest and substantially related means."
  },
  {
    id: 59,
    category: "Standards of Review",
    type: "multiple_choice",
    question: "Carolene Products Footnote 4 suggests heightened judicial scrutiny may be appropriate in which situations?",
    options: [
      "Only economic regulation cases",
      "When legislation restricts Bill of Rights, interferes with political processes, or targets discrete and insular minorities",
      "Only cases involving foreign affairs",
      "Any case the Court deems politically important"
    ],
    answer: 1,
    explanation: "Footnote 4 identifies three situations for heightened scrutiny: (1) legislation restricting Bill of Rights, (2) interference with political processes, and (3) laws directed at religious, racial, or other 'discrete and insular minorities.'"
  },

  // === SEX DISCRIMINATION ===
  {
    id: 60,
    category: "Sex Discrimination",
    type: "multiple_choice",
    question: "Craig v. Boren (1976) is important because it:",
    options: [
      "Applied strict scrutiny to sex classifications",
      "Created intermediate scrutiny as the standard for sex-based classifications",
      "Held that sex discrimination violates the Commerce Clause",
      "Required an Equal Rights Amendment before sex could receive heightened scrutiny"
    ],
    answer: 1,
    explanation: "Craig v. Boren established intermediate scrutiny for sex-based classifications: the government must show an important interest and substantially related means. This was the first time the Court formally applied a standard between rational basis and strict scrutiny."
  },
  {
    id: 61,
    category: "Sex Discrimination",
    type: "multiple_choice",
    question: "In United States v. Virginia (VMI case), Justice Ginsburg required an 'exceedingly persuasive' justification, which:",
    options: [
      "Is identical to rational basis review",
      "Pushes intermediate scrutiny closer to strict scrutiny",
      "Is a brand new standard replacing all three tiers",
      "Only applies to military schools"
    ],
    answer: 1,
    explanation: "Ginsburg's 'exceedingly persuasive justification' language appeared to heighten intermediate scrutiny for sex classifications, pushing it closer to strict scrutiny. She also required the government's ACTUAL justification, not post-hoc rationalizations."
  },
  {
    id: 62,
    category: "Sex Discrimination",
    type: "multiple_choice",
    question: "In Nguyen v. INS, the Court upheld different citizenship requirements for children of citizen mothers vs. citizen fathers because:",
    options: [
      "It was based on racial differences",
      "It was based on 'real' reproductive differences — mothers have biological proof of parentage at birth",
      "The law treated men and women identically",
      "The 14th Amendment doesn't apply to immigration"
    ],
    answer: 1,
    explanation: "The Court found the law was based on real biological differences: mothers have proof of parentage at birth while fathers may not. The two interests were (1) biological relationship and (2) opportunity to develop an actual relationship."
  },

  // === KOREMATSU & FOOTNOTES ===
  {
    id: 63,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "Korematsu v. United States is significant for establishing what standard, even though the Court upheld the Japanese internment?",
    options: [
      "Rational basis review",
      "Intermediate scrutiny",
      "Strict scrutiny / 'most rigid scrutiny' for racial classifications",
      "The political question doctrine"
    ],
    answer: 2,
    explanation: "Despite upholding internment, Korematsu announced that racial classifications are subject to 'the most rigid scrutiny.' Justice Jackson's dissent warned the Court was setting dangerous precedent. The case was later overruled by SFFA."
  },
  {
    id: 64,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "The distinction between 'de jure' and 'de facto' segregation is:",
    options: [
      "De jure is private, de facto is governmental",
      "De jure is segregation by law; de facto is segregation resulting from factors other than law",
      "Both terms mean the same thing",
      "De jure applies only to schools; de facto applies to housing"
    ],
    answer: 1,
    explanation: "De jure segregation is imposed by law (state action). De facto segregation results from private choices, economic factors, and housing patterns. The Constitution clearly prohibits de jure; whether it requires remedying de facto is debated."
  },

  // === LOCHNER ERA & FORMALISM VS. REALISM ===
  {
    id: 65,
    category: "Interpretation",
    type: "multiple_choice",
    question: "Legal formalism views the law as:",
    options: [
      "A tool of social engineering that should be evaluated by its real-world effects",
      "A logical, coherent system with correct answers, like math and science",
      "Always indeterminate and subject to manipulation",
      "Only meaningful in its historical context"
    ],
    answer: 1,
    explanation: "Formalism treats law as a logical, internally coherent system with deterministic right answers. Realism, by contrast, recognizes that most hard cases involve policy judgments and that the law should be evaluated by what it actually does in the real world."
  },
  {
    id: 66,
    category: "Due Process",
    type: "multiple_choice",
    question: "What is the significance of the 'Political Process Theory' (John Hart Ely)?",
    options: [
      "Courts should never interfere with legislation",
      "Courts should police the democratic process to ensure it's working, especially to protect minority rights",
      "Only Congress can interpret the Constitution",
      "Courts should defer to the executive on all matters"
    ],
    answer: 1,
    explanation: "Ely's Political Process Theory (from 'Democracy and Distrust') holds that judicial review is justified when courts police the political process itself — ensuring it's fair and protecting minorities who can't protect themselves through democratic channels."
  },

  // === NFIB (ACA) ===
  {
    id: 67,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "In NFIB v. Sebelius (ACA case), Chief Justice Roberts held that the individual mandate was NOT valid under the Commerce Clause because:",
    options: [
      "Healthcare is not economic activity",
      "Congress can regulate activity but not compel inactivity — it cannot force people to buy insurance",
      "The mandate was too narrowly tailored",
      "Healthcare is a state matter under the 10th Amendment"
    ],
    answer: 1,
    explanation: "Roberts drew a line between regulating existing activity and compelling people to engage in commerce. The mandate tried to 'create' commercial activity (forcing purchases), which crossed the line. However, Roberts upheld it as a valid exercise of the taxing power."
  },
  {
    id: 68,
    category: "Commerce Clause",
    type: "true_false",
    question: "NFIB v. Sebelius overruled Wickard v. Filburn.",
    answer: 1,
    explanation: "False. NFIB did NOT overrule any Commerce Clause precedent. J&L, Darby, Wickard, Heart of Atlanta, McClung, Lopez, Morrison, and Raich all remain good law."
  }
    ]
  },
  "Property Law": {
    emoji: "🏠",
    color: "#059669",
    questions: [
  {id:1,category:"Property Theory",type:"multiple_choice",question:"Blackstone's view of property is best described as:",options:["Property is a bundle of rights created by government","Property comes from natural law and involves the right to exclude","Property is whatever the court says it is","Property is purely about economic efficiency"],answer:1,explanation:"Blackstone held that property comes from natural law and God, is defined by nature, and centers on exclusion — no one, including the government, can intervene. This is a highly libertarian, formalist view."},
  {id:2,category:"Property Theory",type:"multiple_choice",question:"Legal Realists like Robert Hale view property as:",options:["Natural rights that preexist government","A bundle of rights where government determines and shapes property rights","Purely about the right to exclude","Fixed categories defined by nature"],answer:1,explanation:"Legal Realists see property as created by government and society, not nature. Hale argued that the government is always involved in property distribution — there is no escape from government in property law."},
  {id:3,category:"Property Theory",type:"multiple_choice",question:"The 'New Essentialists' (Merrill & Smith) argue that property is primarily about:",options:["Redistribution of wealth","Exclusion, but from a positivist (not natural law) perspective that allows contextual determinations","Whatever the legislature says","Pure contract rights"],answer:1,explanation:"Merrill & Smith hold that property is mainly about exclusion, but unlike Blackstone, they are positivists — law is created by the state. They allow for contextual determinations and government intervention while arguing property should have a definable essence."},
  {id:4,category:"Property Theory",type:"multiple_choice",question:"Robert Hale's key insight about property and coercion is that:",options:["Only government can coerce","Property rights exist in the shadow of government intervention — both sides use state-backed coercion","Coercion only exists in criminal law","The market is a natural, government-free institution"],answer:1,explanation:"Hale argued property rights are always shaped by government. Both owners and workers use state-backed coercive power. The government either takes over decision-making or defers to the owner — either way you cannot escape the government."},
  {id:5,category:"Property Theory",type:"multiple_choice",question:"The 'constitutive' vs. 'instrumental' distinction means:",options:["Whether property is real or personal","Whether an object is fundamental to identity (constitutive) or merely useful for goals (instrumental)","Whether property was acquired by purchase or gift","Whether the government created the right"],answer:1,explanation:"A grandmother's brooch may be constitutive — part of who you are. A bus ticket is instrumental — it facilitates something. This matters for connection-based theories of property."},
  {id:6,category:"Acquisition",type:"multiple_choice",question:"In Pierson v. Post, the majority held that property in a wild animal requires:",options:["Mere pursuit","A reasonable prospect of capture","Actual capture, mortal wounding, or maiming plus pursuit (occupancy)","Ownership of the land where the animal is found"],answer:2,explanation:"The majority required 'occupancy' — actual capture, mortal wounding, or maiming with continued pursuit. Mere pursuit was insufficient."},
  {id:7,category:"Acquisition",type:"multiple_choice",question:"The dissent in Pierson v. Post argued for a different standard primarily based on:",options:["Natural law principles","Custom among hunters, public policy (foxes are pests), and desert/effort theory","The Constitution's property clause","International treaties"],answer:1,explanation:"Livingston's dissent relied on hunter customs, utilitarian public policy (foxes are bad), and desert-effort theory (Post did the hard work). He would have used a 'reasonable prospect of capture' standard."},
  {id:8,category:"Acquisition",type:"multiple_choice",question:"In Johnson v. M'Intosh, the Doctrine of Discovery meant:",options:["First European nation to discover land got title; Native Americans kept possession/use but not full title or right to transfer","Whoever physically occupied land first owned it","Native Americans had no rights whatsoever","The land belonged to whoever could defend it"],answer:0,explanation:"Discovery gave the discovering European nation title; Native Americans retained possession and use but could not transfer title to anyone other than the discovering sovereign."},
  {id:9,category:"Acquisition",type:"true_false",question:"In Johnson v. M'Intosh, the dispute was fabricated so the parties could get a judicial answer about land ownership.",answer:0,explanation:"True. The dispute was fabricated — Johnson even picked opposing counsel. They wanted a definitive answer about who owned the land."},
  {id:10,category:"Creation & Accession",type:"multiple_choice",question:"In INS v. AP, the Court held that property rights in news exist:",options:["Permanently against everyone","Only in 'hot news,' only against competitors, and only when there is unnecessary/unfair injury","Only for printed newspapers","Never"],answer:1,explanation:"The Court created a narrow quasi-property right: (1) in hot news, (2) against competitors only, (3) when there is unnecessary or unfair injury. This is relative property."},
  {id:11,category:"Creation & Accession",type:"multiple_choice",question:"The Principle of Accession holds that:",options:["The government always gets the property","The smaller/subordinate resource follows the greater/dominant resource","First in time, first in right","Stolen property always returns to the original owner"],answer:1,explanation:"The lesser follows the greater. A calf follows the cow's owner; a chandelier follows the house."},
  {id:12,category:"Creation & Accession",type:"multiple_choice",question:"Under the Doctrine of Accession (Wetherbee), when can a transformer of stolen materials keep the product?",options:["Never","When materials are changed to a different species and not willfully taken, OR when labor adds substantially more value","Whenever they add any labor","Only if they pay triple value"],answer:1,explanation:"Under the civil law rule, materials changed to a different species AND not willfully taken may be kept (with payment for materials). The relative value test also matters."},
  {id:13,category:"Creation & Accession",type:"multiple_choice",question:"The Ad Coelum rule was limited in Hinman to:",options:["Exactly 500 feet above surface","Whatever the FAA designates","The extent the owner can use, what is necessary/convenient, and whether use/enjoyment of surface is destroyed","Only the first 10 feet underground"],answer:2,explanation:"Hinman limited ad coelum to practical boundaries: as far as you can use, necessary and convenient, and whether intrusion destroys use and enjoyment of the surface."},
  {id:14,category:"Creation & Accession",type:"multiple_choice",question:"New York's MARIA test for fixtures stands for:",options:["Market, Appraisal, Regulation, Intent, Agreement","Method of attachment, Adaptability, Relationship of parties, Intention, Agreement","Mortgage, Assessment, Recording, Insurance, Alienation","Material, Age, Replacement, Installation, Abandonment"],answer:1,explanation:"MARIA = Method of attachment, Adaptability, Relationship of the parties, Intention, and Agreement."},
  {id:15,category:"Adverse Possession",type:"multiple_choice",question:"The elements of adverse possession are:",options:["Just continuous use for any period","Claim of ownership, actual/hostile possession, open/notorious/visible, continuous/uninterrupted, exclusive, and peaceful","Filing a deed and paying taxes","Asking the owner's permission and staying"],answer:1,explanation:"All six elements must be met for the statutory period: claim of ownership, actual/hostile possession, open/notorious/visible, continuous/uninterrupted, exclusive, and peaceful."},
  {id:16,category:"Adverse Possession",type:"true_false",question:"Adverse possession can be maintained against the federal government.",answer:1,explanation:"False. Adverse possession cannot be maintained against federal or most state governments."},
  {id:17,category:"Adverse Possession",type:"multiple_choice",question:"'Tacking' in adverse possession means:",options:["Adding a fence","Combining successive periods by parties in privity to meet the statutory period","Filing multiple lawsuits","Paying back taxes"],answer:1,explanation:"Tacking allows combining periods if parties are in privity (sale, lease, inheritance). Without privity, periods cannot be tacked."},
  {id:18,category:"Protection of Property",type:"multiple_choice",question:"Berg v. Wiley established that for real property where the landlord lacks possession:",options:["Self-help is always permitted","Self-help is generally not permitted — landlords must use judicial process","Deadly force is acceptable","The landlord can change locks anytime"],answer:1,explanation:"Landlords cannot use self-help to regain possession. They must go through judicial process."},
  {id:19,category:"Protection of Property",type:"multiple_choice",question:"Self-help repossession of personal property (Williams v. FMCC) is permitted only if:",options:["The creditor has a security interest and there is no breach of the peace","The debtor consents each time","A court order is obtained","The property is worth less than $5,000"],answer:0,explanation:"For secured personal property under the UCC, self-help is allowed with a security interest AND no breach of the peace."},
  {id:20,category:"Trespass & Nuisance",type:"multiple_choice",question:"Trespass to real property is strict liability, meaning:",options:["Intent to harm must be proven","No damages need be proved — any unauthorized entry is sufficient","The trespasser must cause $1,000+ damage","Only criminal trespass counts"],answer:1,explanation:"Any unauthorized physical entry is actionable regardless of intent or actual damages."},
  {id:21,category:"Trespass & Nuisance",type:"multiple_choice",question:"In Jacques, punitive damages for trespass were awarded because:",options:["The trespasser was wealthy","Protecting the right to exclude has dignitary value and deters bad behavior","The jury was biased","The trespass occurred at night"],answer:1,explanation:"The right to exclude has inherent dignitary value. Punitive damages deter intentional trespass and prevent self-help."},
  {id:22,category:"Trespass & Nuisance",type:"multiple_choice",question:"The key distinction between trespass and nuisance is:",options:["Trespass is criminal; nuisance is civil","Trespass protects possession (tangible/direct); nuisance protects use and enjoyment (significant/unreasonable harm)","They are the same","Trespass requires intent; nuisance does not"],answer:1,explanation:"Trespass = possessory interest, tangible/direct, strict liability. Nuisance = use/enjoyment, significant/unreasonable harm, cost-benefit balancing."},
  {id:23,category:"Trespass & Nuisance",type:"multiple_choice",question:"The Coase Theorem suggests that:",options:["Courts should always side with plaintiff","If property rights are well-defined and transaction costs low, parties bargain to efficient outcome regardless of initial entitlement","Government should never intervene","Nuisance should be abolished"],answer:1,explanation:"Coase: with clear rights and low transaction costs, private bargaining produces efficient outcomes regardless of initial allocation."},
  {id:24,category:"Trespass & Nuisance",type:"multiple_choice",question:"In Boomer v. Atlantic Cement, the 'conditional injunction' meant:",options:["Factory closes immediately","Nuisance enjoined UNLESS defendant pays permanent damages to continue","Plaintiff must move","Case dismissed"],answer:1,explanation:"Boomer = liability rule. Plaintiff got the entitlement but defendant could pay to continue. Rule 2 in Calabresi-Melamed."},
  {id:25,category:"Trespass & Nuisance",type:"multiple_choice",question:"In Spur v. Del Webb, the unusual remedy was:",options:["Developer tears down homes","Feedlot must move BUT developer must indemnify the feedlot owner","Both parties mediate","Coming to nuisance doctrine applied"],answer:1,explanation:"Rule 4: feedlot must move (public nuisance) but developer who 'came to the nuisance' must pay relocation costs."},
  {id:26,category:"Landlord-Tenant",type:"multiple_choice",question:"The four types of landlord-tenant relationships are:",options:["Lease, license, easement, covenant","Term of years, periodic, tenancy at will, tenancy at sufferance","Fee simple, life estate, remainder, reversion","Joint tenancy, TIC, tenancy by entirety, community property"],answer:1,explanation:"They differ in how they end: term of years (fixed end), periodic (rolls over, notice needed), at will (either party ends), at sufferance (holdover)."},
  {id:27,category:"Landlord-Tenant",type:"multiple_choice",question:"The implied warranty of habitability:",options:["Can always be waived","Often cannot be waived, is based on housing codes, and applies to residential leases","Applies only to commercial leases","Was part of common law since 1200"],answer:1,explanation:"Emerged in 1960s-70s, often unwaivable, based on housing codes, residential leases only. Commercial uses constructive eviction."},
  {id:28,category:"Landlord-Tenant",type:"multiple_choice",question:"The difference between assignment and sublease is:",options:["They are the same","In assignment, entire interest transfers and landlord has privity with new tenant; in sublease, original tenant plans to return","Assignment requires court approval","Sublease transfers more rights"],answer:1,explanation:"Assignment = entire remaining interest transferred, landlord has direct relationship with assignee. Sublease = original tenant retains interest, no direct landlord-subletter relationship."},
  {id:29,category:"Recording Systems",type:"multiple_choice",question:"Under a 'notice' recording system:",options:["First to record wins","Subsequent GFPV who LACKS notice gets the property","Only government entities can record","Recording has no effect"],answer:1,explanation:"In notice, a subsequent bona fide purchaser for value without notice prevails. The last GFPV wins."},
  {id:30,category:"Recording Systems",type:"multiple_choice",question:"Under 'race-notice,' to prevail a subsequent purchaser must:",options:["Only record first","Only lack notice","Be a subsequent GFPV without notice AND be first to record","Pay the highest price"],answer:2,explanation:"Race-notice requires BOTH: (1) GFPV without notice AND (2) first to record. If neither meets both, nemo dat applies."},
  {id:31,category:"Recording Systems",type:"multiple_choice",question:"The Shelter Rule provides that:",options:["Anyone purchasing from a GFPV gets protected status even if not a GFPV themselves","Only original purchasers are protected","Recording creates absolute protection","Government shelters all owners"],answer:0,explanation:"Shelter extends GFPV protection to subsequent purchasers. Exception: does NOT apply when transferred back to original grantor (prevents collusion)."},
  {id:32,category:"Recording Systems",type:"multiple_choice",question:"A 'wild deed' is:",options:["A deed with unusual terms","A recorded deed outside the chain of title because a prior deed was never recorded","A deed signed outdoors","A fraudulent deed"],answer:1,explanation:"A wild deed is recorded but unconnectable to the chain of title because a preceding transfer was never recorded."},
  {id:33,category:"Recording Systems",type:"multiple_choice",question:"'Nemo Dat' means:",options:["Everyone gets equal rights","You cannot give title you do not have","The government controls all titles","Recording creates title"],answer:1,explanation:"Nemo dat quod non habet — you cannot transfer greater rights than you possess. GFPV and recording statutes are exceptions."},
  {id:34,category:"Easements",type:"multiple_choice",question:"An easement differs from a license because an easement is:",options:["Always oral and temporary","Created with writing, non-possessory, irrevocable, enforceable as real interest in land","Same as a lease","Only for government property"],answer:1,explanation:"Easements: writing, non-possessory, irrevocable, real property interest. Licenses: revocable, no writing needed, defense to trespass only."},
  {id:35,category:"Easements",type:"multiple_choice",question:"The four negative easements (WALS) are:",options:["Warranty, Assignment, Lien, Security","Water, Air, Light, and Support","Width, Angle, Length, Setback","Waste, Abandonment, Liability, Servitude"],answer:1,explanation:"WALS = Water, Air, Light, Support. These let the dominant owner stop the servient owner from acting."},
  {id:36,category:"Easements",type:"multiple_choice",question:"An easement can be created by all EXCEPT:",options:["Express grant in writing","Prescription","Estoppel","Oral agreement alone with no reliance"],answer:3,explanation:"Easements can be created by writing, prescription, estoppel, implication, or necessity. Oral agreement alone (without reliance triggering estoppel) is insufficient — Statute of Frauds applies."},
  {id:37,category:"Covenants",type:"multiple_choice",question:"For the BURDEN of a real covenant to run with the land:",options:["Just a handshake","Intent, horizontal privity, full vertical privity, and touch and concern","Only recording","Payment to government"],answer:1,explanation:"Burden requires: intent to bind successors, horizontal privity (real estate transaction between originals), full vertical privity (same durational interest), and touch and concern."},
  {id:38,category:"Covenants",type:"multiple_choice",question:"Real covenants vs. equitable servitudes — the key difference is:",options:["Real covenants are written; equitable servitudes are oral","Real covenants give damages (need horizontal privity); equitable servitudes give injunctions (need notice instead)","They are identical","Real covenants are commercial; equitable servitudes residential"],answer:1,explanation:"Real covenants = damages, require horizontal privity. Equitable servitudes (Tulk v. Moxhay) = injunctions, require notice instead of horizontal privity."},
  {id:39,category:"Mortgages",type:"multiple_choice",question:"Title theory vs. lien theory in mortgages:",options:["Title theory: borrower has title; lien theory: bank has title","Title theory: bank holds legal title; lien theory: borrower retains title, bank has a lien","They are identical","Title theory is for commercial; lien theory residential"],answer:1,explanation:"Title theory: bank holds legal title. Lien theory: borrower retains legal title, bank has only a lien/security interest."},
  {id:40,category:"Mortgages",type:"multiple_choice",question:"The right of redemption allows:",options:["Bank to seize property on first missed payment","Borrower to pay what is owed and reclaim property before (or sometimes after) foreclosure","Borrower to walk away without consequences","Government to take property"],answer:1,explanation:"Equitable right of redemption lets a defaulting borrower pay full amount and keep the property. Some states extend this past foreclosure sale."},
  {id:41,category:"Concurrent Ownership",type:"multiple_choice",question:"In Delfino v. Vealencis, the court held partition in kind is preferred when:",options:["Property is very valuable","Physical division is practicable and serves the parties' interests","Parties are related","Property is commercial"],answer:1,explanation:"Partition in kind preferred when practicable. Vealencis lived there and ran a business — her interests were served by physical division, not forced sale."},
  {id:42,category:"Fair Housing",type:"multiple_choice",question:"Shelley v. Kraemer held that racially restrictive covenants:",options:["Are unconstitutional on their face","Are not unconstitutional themselves, but judicial enforcement constitutes state action violating Equal Protection","Are always enforceable privately","Were abolished by the 13th Amendment"],answer:1,explanation:"Private covenants aren't unconstitutional (private action), but court enforcement = state action = 14th Amendment violation."},
  {id:43,category:"Fair Housing",type:"multiple_choice",question:"The Fair Housing Act's 'Mrs. Murphy exception' exempts:",options:["All landlords named Murphy","Owner-occupied dwellings with no more than three other families","Properties worth under $100,000","Student housing"],answer:1,explanation:"Section 3607(2) exempts owner-occupied dwellings with no more than three other families living there."},
  {id:44,category:"Zoning",type:"multiple_choice",question:"Village of Euclid established that zoning is:",options:["Always unconstitutional","A valid exercise of police power, analogized to nuisance prevention","Only permitted by federal government","Limited to commercial areas"],answer:1,explanation:"Euclid upheld zoning as valid police power, analogized to nuisance prevention, subject to a reasonableness test."},
  {id:45,category:"Zoning",type:"multiple_choice",question:"In Mount Laurel, the court held municipalities must:",options:["Have absolute zoning discretion","Provide opportunity for variety and choice of housing, considering welfare of the entire state","Exclude low-income housing if it reduces property values","Have no zoning power"],answer:1,explanation:"Zoning power comes from the state, so municipalities must consider statewide welfare. Exclusionary zoning violating this is unconstitutional. Effects-based test, not just intent."},
  {id:46,category:"Future Interests",type:"multiple_choice",question:"A fee simple determinable automatically ends when a specified event occurs. The grantor retains a:",options:["Right of re-entry","Reversion","Possibility of reverter","Remainder"],answer:2,explanation:"Fee simple determinable + possibility of reverter: estate automatically reverts. Compare fee simple subject to condition subsequent + right of re-entry (grantor must act)."},
  {id:47,category:"Future Interests",type:"multiple_choice",question:"A 'remainder' becomes possessory:",options:["By cutting short a preceding estate","On the natural expiration of the preceding estate","Only when the grantor dies","Immediately upon creation"],answer:1,explanation:"Remainders wait for natural end of prior estate (like life estate ending at death). Executory interests cut short preceding estates."},
  {id:48,category:"Bailments & Licenses",type:"multiple_choice",question:"Wood v. Leadbitter held that a license (like an event ticket) is:",options:["Irrevocable once paid","Revocable — unless it accompanies a valid grant","Same as an easement","Transferable to heirs"],answer:1,explanation:"A license is revocable. Only exception: when it accompanies a valid grant, making it irrevocable."},
  {id:49,category:"Bailments & Licenses",type:"multiple_choice",question:"A bailment requires:",options:["A sale of goods","Possession, control, and custody transferred to the bailee","Only a written contract","A gift of property"],answer:1,explanation:"Bailment = transfer of possession, control, and custody (not ownership). Can be explicit or constructive."},
  {id:50,category:"Transfers",type:"multiple_choice",question:"A gift causa mortis requires:",options:["Only a written will","Delivery during donor's lifetime, made in expectation of death from specific cause, and donor must die from that cause","Just saying 'I give this to you'","Filing with county recorder"],answer:1,explanation:"Gift causa mortis: (1) delivery during lifetime, (2) in expectation of imminent death, (3) from the specific anticipated cause. Fails if donor survives or dies from different cause."},
  {id:51,category:"Transfers",type:"multiple_choice",question:"The GFPV exception to nemo dat applies when:",options:["Seller has void title (theft)","Seller has voidable title (fraud), buyer acts in good faith, and buyer gives value","Buyer knows goods are stolen","Property is worth under $500"],answer:1,explanation:"GFPV protects buyers from sellers with voidable title (fraud). Does NOT protect from void title (theft)."},
  {id:52,category:"Protection of Property",type:"multiple_choice",question:"In State v. Shack, the court held a farmer could not exclude legal aid workers because:",options:["Workers owned the land","Property rights are malleable and must serve human interests — vulnerable individuals have rights limiting the owner's exclusion","The Constitution requires all property be open","Farmer abandoned the property"],answer:1,explanation:"Property rights must serve human interests. The court considered workers' vulnerability, congressional policy, and the fact the landowner invited them. Owner retained rights to exclude solicitors."},
  {id:53,category:"Protection of Property",type:"multiple_choice",question:"In Ploof v. Putnam, the doctrine of necessity:",options:["Let a property owner destroy a neighbor's dock","Created a temporary property right allowing emergency use of another's property that the owner cannot override with self-help","Let anyone enter any property anytime","Applied only to government officials"],answer:1,explanation:"Necessity creates a temporary right. The dock owner could not use self-help to remove the boat during the storm. Under Vincent, the person may still owe compensation for damages."},
    ]
  }
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const categoryColors = {
  "Judicial Review": "#4F46E5", "Federalism": "#0891B2", "Commerce Clause": "#059669",
  "Spending Power": "#D97706", "Commandeering": "#DC2626", "Separation of Powers": "#7C3AED",
  "Interpretation": "#DB2777", "Individual Rights": "#2563EB", "Reconstruction": "#92400E",
  "Equal Protection": "#B91C1C", "Affirmative Action": "#6D28D9", "Due Process": "#0D9488",
  "Standards of Review": "#EA580C", "Sex Discrimination": "#C026D3",
  "Property Theory": "#7C3AED", "Acquisition": "#0891B2", "Creation & Accession": "#059669",
  "Adverse Possession": "#D97706", "Protection of Property": "#DC2626",
  "Trespass & Nuisance": "#4F46E5", "Landlord-Tenant": "#DB2777",
  "Recording Systems": "#92400E", "Easements": "#2563EB", "Covenants": "#B91C1C",
  "Mortgages": "#6D28D9", "Concurrent Ownership": "#0D9488", "Fair Housing": "#EA580C",
  "Zoning": "#C026D3", "Future Interests": "#4338CA", "Bailments & Licenses": "#0369A1",
  "Transfers": "#9333EA"
};

export default function LawQuiz() {
  const [screen, setScreen] = useState("subject");
  const [currentSubject, setCurrentSubject] = useState(null);
  const [selectedCats, setSelectedCats] = useState(new Set());
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState([]);

  const questions = currentSubject ? subjects[currentSubject].questions : [];
  const categories = [...new Set(questions.map(q => q.category))];

  const pickSubject = (subj) => {
    setCurrentSubject(subj);
    const cats = [...new Set(subjects[subj].questions.map(q => q.category))];
    setSelectedCats(new Set(cats));
    setScreen("home");
  };

  const startQuiz = useCallback((cats, retry = false, retryQs = []) => {
    const pool = retry ? retryQs : shuffle(questions.filter(q => cats.has(q.category)));
    setQuizQuestions(pool);
    setCurrentIdx(0);
    setSelected(null);
    setShowAnswer(false);
    setResults([]);
    setScreen("quiz");
  }, [questions]);

  const handleSelect = (idx) => { if (!showAnswer) setSelected(idx); };

  const checkAnswer = () => {
    if (selected === null) return;
    const q = quizQuestions[currentIdx];
    setResults(prev => [...prev, { ...q, userAnswer: selected, correct: selected === q.answer }]);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelected(null);
      setShowAnswer(false);
    } else setScreen("results");
  };

  const toggleCat = (cat) => {
    setSelectedCats(prev => {
      const n = new Set(prev);
      if (n.has(cat)) n.delete(cat); else n.add(cat);
      return n;
    });
  };

  const score = results.filter(r => r.correct).length;
  const missed = results.filter(r => !r.correct);
  const q = quizQuestions[currentIdx];
  const progress = quizQuestions.length > 0 ? ((currentIdx + (showAnswer ? 1 : 0)) / quizQuestions.length) * 100 : 0;
  const isCorrect = showAnswer && selected === q?.answer;
  const accentColor = currentSubject ? subjects[currentSubject].color : "#7c3aed";

  const base = {
    fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
    maxWidth: 640, margin: "0 auto", padding: "32px 20px", minHeight: "100vh",
    background: "linear-gradient(180deg, #1a1625 0%, #0f0d15 100%)", color: "#e8e4ef"
  };

  // SUBJECT PICKER
  if (screen === "subject") {
    return (
      <div style={base}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: "#8b7fb8", marginBottom: 8 }}>Study Tool</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, background: "linear-gradient(135deg, #c4b5fd, #f0abfc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2 }}>Law School Quiz</h1>
          <p style={{ color: "#9a8fc4", fontSize: 14, marginTop: 8 }}>Choose a subject to study</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {Object.entries(subjects).map(([name, subj]) => (
            <button key={name} onClick={() => pickSubject(name)} style={{
              padding: "24px 20px", borderRadius: 14, border: `1.5px solid ${subj.color}44`,
              background: `${subj.color}11`, color: "#e8e4ef", fontSize: 18, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit", textAlign: "left", transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 16
            }}>
              <span style={{ fontSize: 32 }}>{subj.emoji}</span>
              <div>
                <div>{name}</div>
                <div style={{ fontSize: 13, fontWeight: 400, color: "#9a8fc4", marginTop: 4 }}>{subj.questions.length} questions</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // HOME (topic picker)
  if (screen === "home") {
    return (
      <div style={base}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button onClick={() => setScreen("subject")} style={{ background: "none", border: "none", color: "#8b7fb8", fontSize: 14, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>← Subjects</button>
        </div>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: "#8b7fb8", marginBottom: 8 }}>Study Tool</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{currentSubject}</h1>
          <p style={{ color: "#9a8fc4", fontSize: 14, marginTop: 8 }}>{questions.length} questions across {categories.length} topics</p>
        </div>
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "#a99dd4", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Topics</span>
            <button onClick={() => { if (selectedCats.size === categories.length) setSelectedCats(new Set()); else setSelectedCats(new Set(categories)); }} style={{ background: "none", border: "none", color: "#c4b5fd", fontSize: 12, cursor: "pointer", padding: 0 }}>{selectedCats.size === categories.length ? "Deselect All" : "Select All"}</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {categories.map(cat => {
              const isOn = selectedCats.has(cat);
              const count = questions.filter(qq => qq.category === cat).length;
              return (<button key={cat} onClick={() => toggleCat(cat)} style={{ padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${isOn ? categoryColors[cat] || accentColor : "#2d2640"}`, background: isOn ? `${categoryColors[cat] || accentColor}22` : "#1e1a2e", color: isOn ? "#e8e4ef" : "#6b5f8a", fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>{cat} <span style={{ opacity: 0.5, fontSize: 11 }}>({count})</span></button>);
            })}
          </div>
        </div>
        <button onClick={() => { if (selectedCats.size > 0) startQuiz(selectedCats); }} disabled={selectedCats.size === 0} style={{ width: "100%", padding: "16px 24px", borderRadius: 12, border: "none", background: selectedCats.size === 0 ? "#2d2640" : `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, color: selectedCats.size === 0 ? "#5a4f7a" : "#fff", fontSize: 16, fontWeight: 700, cursor: selectedCats.size === 0 ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: selectedCats.size > 0 ? `0 4px 24px ${accentColor}44` : "none" }}>Start Quiz — {questions.filter(qq => selectedCats.has(qq.category)).length} Questions</button>
      </div>
    );
  }

  // QUIZ
  if (screen === "quiz" && q) {
    const opts = q.type === "true_false" ? ["True", "False"] : q.options;
    return (
      <div style={{...base, padding: "20px 20px 32px"}}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#8b7fb8", fontSize: 14, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>✕</button>
          <div style={{ flex: 1, height: 6, background: "#2d2640", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`, borderRadius: 3, transition: "width 0.4s ease" }} />
          </div>
          <span style={{ fontSize: 13, color: "#8b7fb8", minWidth: 48, textAlign: "right" }}>{currentIdx + 1}/{quizQuestions.length}</span>
        </div>
        <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 6, background: `${categoryColors[q.category] || accentColor}22`, border: `1px solid ${categoryColors[q.category] || accentColor}44`, color: categoryColors[q.category] || "#a99dd4", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>{q.category}</div>
        <h2 style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.5, margin: "0 0 28px", color: "#f0ecf7" }}>{q.question}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {opts.map((opt, i) => {
            let bg = "#1e1a2e", border = "#2d2640", col = "#d1cbe3";
            if (selected === i && !showAnswer) { bg = "#2d2660"; border = accentColor; col = "#f0ecf7"; }
            if (showAnswer) {
              if (i === q.answer) { bg = "#0a2e1a"; border = "#22c55e"; col = "#86efac"; }
              else if (i === selected && !isCorrect) { bg = "#2e0a0a"; border = "#ef4444"; col = "#fca5a5"; }
              else { col = "#5a4f7a"; }
            }
            return (<button key={i} onClick={() => handleSelect(i)} style={{ padding: "14px 18px", borderRadius: 10, border: `1.5px solid ${border}`, background: bg, color: col, fontSize: 15, textAlign: "left", cursor: showAnswer ? "default" : "pointer", fontFamily: "inherit", lineHeight: 1.4, transition: "all 0.15s" }}>
              <span style={{ display: "inline-block", width: 24, height: 24, borderRadius: "50%", border: `1.5px solid ${showAnswer && i === q.answer ? "#22c55e" : showAnswer && i === selected ? "#ef4444" : selected === i ? accentColor : "#3d3660"}`, textAlign: "center", lineHeight: "22px", fontSize: 12, fontWeight: 700, marginRight: 12, background: showAnswer && i === q.answer ? "#22c55e22" : "transparent", color: showAnswer && i === q.answer ? "#22c55e" : showAnswer && i === selected ? "#ef4444" : "#8b7fb8", verticalAlign: "middle" }}>{String.fromCharCode(65 + i)}</span>{opt}
            </button>);
          })}
        </div>
        {showAnswer && (
          <div style={{ padding: "16px 18px", borderRadius: 10, background: isCorrect ? "#0a2e1a" : "#2e1a0a", border: `1px solid ${isCorrect ? "#22c55e33" : "#f5930033"}`, marginBottom: 24, animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img src={isCorrect ? MARVIN_RIGHT : MARVIN_WRONG} alt={isCorrect ? "Happy Marvin" : "Sad Marvin"} style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover", border: `2px solid ${isCorrect ? "#22c55e55" : "#f5930055"}` }} />
                {isCorrect && (<div style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #22c55e, #4ade80)", color: "#0a2e1a", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 6, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}>Hooray!</div>)}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: isCorrect ? "#4ade80" : "#fb923c", letterSpacing: 1, textTransform: "uppercase" }}>{isCorrect ? "Correct!" : "Not quite..."}</div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: "#d1cbe3" }}>{q.explanation}</p>
          </div>
        )}
        {!showAnswer ? (
          <button onClick={checkAnswer} disabled={selected === null} style={{ width: "100%", padding: "15px", borderRadius: 10, border: "none", background: selected === null ? "#2d2640" : `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, color: selected === null ? "#5a4f7a" : "#fff", fontSize: 15, fontWeight: 700, cursor: selected === null ? "not-allowed" : "pointer", fontFamily: "inherit" }}>Check Answer</button>
        ) : (
          <button onClick={nextQuestion} style={{ width: "100%", padding: "15px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{currentIdx < quizQuestions.length - 1 ? "Next Question →" : "See Results"}</button>
        )}
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    );
  }

  // RESULTS
  if (screen === "results") {
    const pct = Math.round((score / results.length) * 100);
    const grade = pct >= 90 ? "A" : pct >= 80 ? "B" : pct >= 70 ? "C" : pct >= 60 ? "D" : "F";
    const gradeColor = pct >= 80 ? "#4ade80" : pct >= 60 ? "#fbbf24" : "#ef4444";
    return (
      <div style={base}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 100, height: 100, borderRadius: "50%", border: `4px solid ${gradeColor}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", background: `${gradeColor}11` }}>
            <span style={{ fontSize: 40, fontWeight: 800, color: gradeColor }}>{grade}</span>
          </div>
          <h2 style={{ fontSize: 24, margin: "0 0 4px" }}>{score} / {results.length}</h2>
          <p style={{ color: "#8b7fb8", fontSize: 14, margin: 0 }}>{pct}% correct</p>
        </div>
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 14, color: "#a99dd4", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>By Topic</h3>
          {[...new Set(results.map(r => r.category))].map(cat => {
            const cr = results.filter(r => r.category === cat);
            const cc = cr.filter(r => r.correct).length;
            const cp = Math.round((cc / cr.length) * 100);
            return (<div key={cat} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #2d264044" }}><span style={{ fontSize: 14, color: "#d1cbe3" }}>{cat}</span><span style={{ fontSize: 13, fontWeight: 700, color: cp >= 80 ? "#4ade80" : cp >= 60 ? "#fbbf24" : "#ef4444" }}>{cc}/{cr.length}</span></div>);
          })}
        </div>
        {missed.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 14, color: "#a99dd4", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Missed Questions</h3>
            {missed.map((m, i) => (<div key={i} style={{ padding: "14px 16px", borderRadius: 10, background: "#1e1a2e", border: "1px solid #2d2640", marginBottom: 10 }}><p style={{ fontSize: 14, margin: "0 0 8px", color: "#d1cbe3", lineHeight: 1.4 }}>{m.question}</p><p style={{ fontSize: 13, margin: 0, color: "#4ade80" }}>✓ {m.type === "true_false" ? (m.answer === 0 ? "True" : "False") : m.options[m.answer]}</p></div>))}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {missed.length > 0 && (<button onClick={() => startQuiz(selectedCats, true, shuffle(missed))} style={{ width: "100%", padding: "15px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Retry Missed ({missed.length})</button>)}
          <button onClick={() => startQuiz(selectedCats)} style={{ width: "100%", padding: "15px", borderRadius: 10, border: `1.5px solid ${accentColor}`, background: "transparent", color: "#c4b5fd", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>New Quiz</button>
          <button onClick={() => setScreen("home")} style={{ width: "100%", padding: "15px", borderRadius: 10, border: "1.5px solid #2d2640", background: "transparent", color: "#8b7fb8", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Back to Topics</button>
          <button onClick={() => setScreen("subject")} style={{ width: "100%", padding: "15px", borderRadius: 10, border: "1.5px solid #2d2640", background: "transparent", color: "#8b7fb8", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Switch Subject</button>
        </div>
      </div>
    );
  }
  return null;
}
