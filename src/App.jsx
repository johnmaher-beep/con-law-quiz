import { useState, useEffect, useCallback } from "react";

const MARVIN_WRONG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABcQERQRDhcUEhQaGBcbIjklIh8fIkYyNSk5UkhXVVFIUE5bZoNvW2F8Yk5QcptzfIeLkpSSWG2grJ+OqoOPko3/2wBDARgaGiIeIkMlJUONXlBejY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY3/wAARCAB4AFwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCeCPy0Rm7fNj1Y9BVLXZxEiWoOZG+eU/yH9avzXEcYkuXH7qEfKP7xrl5pnnmkmlOXckk0yUR9vqaM/KT6mkzwPYUp6gdlFAxO+PSgHv8AgKArNwqkn2FKQVOCCMcAGgYL97PpSdvqaM4XHc0d8elAAewHQUH9BQOtB7CgBO+e9FIetFAG9e4ukjjDFYk5IxyTVU2duo53H6ml38daC2R1rHmZpyojMMAyVizj1Jp6RBh5aRCXzBjYf4SD1z9KimyCADwetTW8yWxIZwJHHGewqrtIlpNkySLANiKAR1xUn2lXwHVSPeoGtpzztBLc5BHNM8vBwVLMOoPb61BZK1tBcsGhgyfUHaKhk02UZC2Zx6q+avWo5ycn6VqxIHUEdPrRzNByo4+WBoSdwII6gjBH1qKuyvbGO6jAfbuH3WPUe30rkbmFreZo3GCDjHpWkZXIcbEJoxTgjlC4VioOCwHAP1pMGrJLobFLvyajJpCcAmsTQlUqzEknPYYqNwFDswDFqdEN+1cFRjmmSYJZeoHSqsSmTWd/JEEjA3qDV5XEjbmyfqazoI9i5/iNXLQbpOTgDk1LLRqWyptJAK+hogumiZkcncrYz60GQRw7zwAOKprKTIWI5YZqBm4HWZCMjJHBrHubOSS4JuEQADBkIBz9KmjkJI2nAq5cRmayIxlhyM0Jg0Y1/P5IEG3ba7CuAOCcfz6Vh5NayW7SWrI7spLgsCMknnNL/Y8cnKXG0dww5zW0dEZtNmfmkflTTQc0q8sAakomAwij2qM8YAFSlwaiJG4EnvTTsS1csjCqAT0q1aBWI2nPcgVk3DMsrYPFT2F00IcnuMCk1oUnqXr653KEXp3qSIb4k9RWUZd8hz9K07SVVIz06CoaKTNC3TGc9avoyrCzP90Ak/Sq6KCwI7ijUH8rTpVzhmXFShswpbhppmKthM8HuRS727ZI9zVaPcRnt/Opx05rYgzXIJ460qtg81GcbsLTwmRjOKBEgx2BoOKRfkwFJP40Nlj1xRYBzJ5iqeh709IuMjpTSwUYqwkirFjHzNQBT2MeQPepA8ibQTjAyCaur5aNGT1JIP0qqdsLt3APGaANG2vHQiadiEAwq9zUF3fNdZB+6TyP6VTeVpm3HIHpSgilYdyT7wzmngnHf86YOafkd6oDNGDyMZqVBkZqV4N2SmATUcYKgqwwRQIWkpTQvNMCNm2uCatQgSkvuHHalNkkqYVyH96ie32SEFGUDoe5oFYVpQRkdjTcGRsscDsKkSFeCnXtuFO34O10GR3HFIYzZ6EH26U4dcYxUisrDB/Cjbg8HNAwAAPFIVwadjPIo69aYEYkGA38J7+lEyjZuPUd/UVno742AbhUzyysOOBjFTYVxxpVbHPft7VGp+QE9ehpwqhEob3qWO4ZeOGX0NVwacGpDLPyHlRt9qcVWYejiq6nFSK3cGgYMm04NOXpR94UDgUwFT72KUrk0i9zU6plaAMKNQW+Y4FWxtdSVAwBxRRQyERLgnHoaceKKKBhnilBoooGSCngUUUAPHFOxRRQMlRMjFWQnFFFAH//2Q==";

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
    options: ["Congress has plenary police power", "The President has absolute immunity for official acts", "States can nullify federal laws", "The Supreme Court has the power of judicial review over legislation"],
    answer: 3,
    explanation: "Marbury v. Madison established that the Supreme Court has judicial review — the power to declare laws unconstitutional. Marshall called it 'the province and duty of the judicial department to say what the law is.'"
  },
  {
    id: 2,
    category: "Judicial Review",
    type: "multiple_choice",
    question: "Why did Marbury ultimately lose his case despite having a right to his commission?",
    options: ["The commission was never properly signed by the President and therefore never became legally effective", "Marbury failed to file his claim within the applicable statute of limitations for mandamus actions", "The President retained executive discretion to withhold delivery of judicial commissions at any time", "The statute expanding the Supreme Court's original jurisdiction was unconstitutional"],
    answer: 3,
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
    options: ["Why 9 unelected judges should be able to override the will of the elected majority", "The challenge of enforcing judicial decisions without an army", "The difficulty of amending the Constitution", "The problem of states overriding federal law"],
    answer: 0,
    explanation: "Bickel's Countermajoritarian Difficulty asks why unelected, life-tenured judges should have the power to prevent a majority of Americans from enacting laws through their elected representatives."
  },
  {
    id: 5,
    category: "Judicial Review",
    type: "multiple_choice",
    question: "In Cooper v. Aaron, the Court expanded judicial review by holding that:",
    options: ["The Supreme Court's constitutional interpretations are binding on all actors, including non-parties", "States can delay compliance with Supreme Court orders for safety reasons", "Only parties to a case are bound by Supreme Court decisions", "The President can override Supreme Court decisions through executive orders"],
    answer: 0,
    explanation: "Cooper v. Aaron went beyond Marbury by declaring that the Supreme Court's interpretations of the Constitution are supreme and binding on all government actors — parties and non-parties alike."
  },
  {
    id: 6,
    category: "Judicial Review",
    type: "multiple_choice",
    question: "'Departmentalism' is the view that:",
    options: ["All three branches can interpret the Constitution", "Constitutional interpretation belongs solely to Congress", "Each department of government operates independently without checks", "Only the judiciary can interpret the Constitution"],
    answer: 0,
    explanation: "Departmentalism holds that all branches of government — not just the judiciary — have the power to interpret the Constitution. This is the opposite of judicial exclusivity."
  },

  // === FEDERALISM & ENUMERATED POWERS ===
  {
    id: 7,
    category: "Federalism",
    type: "multiple_choice",
    question: "McCulloch v. Maryland answered two key questions. The first was whether Congress had power to create a national bank. What was the second?",
    options: ["Whether Maryland could tax the national bank", "Whether states could create competing banks", "Whether the bank could issue its own currency", "Whether the President could veto the bank's charter"],
    answer: 0,
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
    options: ["Constitutional interpretation should be left to Congress", "The Constitution is a flexible document that should be read expansively", "The Constitution should be read narrowly like a statute", "The Constitution cannot be changed without a formal amendment"],
    answer: 1,
    explanation: "Marshall argued the Constitution is different from an ordinary statute — it must be flexible and read expansively to adapt to changing circumstances, which supports broader congressional power."
  },
  {
    id: 10,
    category: "Federalism",
    type: "multiple_choice",
    question: "In McCulloch, the Court interpreted 'necessary' in the Necessary and Proper Clause to mean:",
    options: ["Required by the text of the Constitution", "Only what the Founders specifically intended", "Absolutely essential and indispensable", "Essential OR helpful/convenient"],
    answer: 3,
    explanation: "The Court rejected the narrow reading of 'necessary' as 'absolutely essential.' Instead, Marshall read it as meaning 'essential OR helpful,' noting that Article I, Section 10 uses 'absolutely necessary' — if the Framers had meant that here, they would have said so."
  },

  // === COMMERCE CLAUSE ===
  {
    id: 11,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "Which Commerce Clause theory holds that even if an activity isn't commerce itself, its connection to what happens before and after makes it regulable?",
    options: ["Direct Effects test", "Substantial Effects test", "Stream of Commerce theory", "No Aggregation principle"],
    answer: 2,
    explanation: "The Stream of Commerce theory broadens Congress's power by treating activities as part of commerce if they occur between interstate commercial steps — like making steaks between receiving cattle and shipping the product."
  },
  {
    id: 12,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "Which Commerce Clause tests did Wickard v. Filburn eliminate?",
    options: ["Commerce definition and Substantial Effects tests", "Motive and Stream of Commerce tests", "Stream of Commerce and Motive tests", "Direct Effects and No Aggregation tests"],
    answer: 3,
    explanation: "Wickard eliminated the Direct Effects test (local activity CAN be regulated if it has substantial effects) and the No Aggregation test (creating the 'Wickard Aggregation Effect' — aggregating all similar actors nationwide)."
  },
  {
    id: 13,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "After Wickard, which Commerce Clause test(s) survived?",
    options: ["Direct Effects and No Aggregation", "Substantial Effects test and Wickard Aggregation Effect", "Stream of Commerce and Motive tests", "Only the Commerce definition test"],
    answer: 1,
    explanation: "After Wickard, only the Substantial Effects test and the Wickard Aggregation Effect remained. This gave Congress an incredibly expansive commerce power — leading the Court to stop challenging Congress on commerce for decades."
  },
  {
    id: 14,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "Darby did away with which test regarding Congress's Commerce Clause power?",
    options: ["The No Aggregation test", "The Stream of Commerce test", "The Motive test — Congress's motive for regulation no longer matters", "The Substantial Effects test"],
    answer: 2,
    explanation: "Darby eliminated the Motive test. Congress's purpose for regulating doesn't matter — regulation of commerce can be a means to achieve other ends. Darby also said the 10th Amendment is merely 'a truism.'"
  },
  {
    id: 15,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "In U.S. v. Lopez, the Court identified three categories Congress may regulate under the Commerce Clause. Which is NOT one of them?",
    options: ["Activities with any indirect connection to interstate commerce", "Instrumentalities, persons, or things in interstate commerce", "Channels of interstate commerce", "Activities that substantially affect interstate commerce"],
    answer: 0,
    explanation: "Lopez established three categories: (1) channels, (2) instrumentalities/persons/things, and (3) activities with a substantial relation to interstate commerce. The 'any indirect connection' standard was the pre-New Deal approach the Court rejected."
  },
  {
    id: 16,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "Lopez introduced what new requirement that limited the Substantial Effects test?",
    options: ["The regulation must involve international commerce", "The President must sign a separate commerce finding", "Congress must have unanimous approval for the regulation", "The underlying activity being regulated must be economic in nature"],
    answer: 3,
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
    options: ["The 14th Amendment Equal Protection Clause applies only to state action and cannot reach private business discrimination", "The Commerce Clause was easier to invoke because it had been recently amended to expand federal power", "The hotel was situated on federal land, placing it under direct congressional regulatory authority", "The Equal Protection Clause had been effectively narrowed by subsequent amendments and judicial interpretation"],
    answer: 0,
    explanation: "The 14th Amendment's Equal Protection Clause begins with 'no state shall' — it applies to state action, not private citizens. Since the Civil Rights Cases (1883) limited Congress's power under the 14th Amendment against private actors, the Commerce Clause provided the constitutional basis."
  },
  {
    id: 19,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "In Morrison (Violence Against Women Act), the Court struck down the law despite detailed congressional findings. What was the key reason?",
    options: ["The findings were fabricated", "Gender-based violence is not economic activity", "The law violated the First Amendment", "Congress failed to include a jurisdictional element"],
    answer: 1,
    explanation: "Despite detailed congressional findings about the effects of gender-based violence on commerce, the Court held that the underlying activity was not economic, applying the Lopez framework. The Court — not Congress — decides the federal-state line."
  },

  // === SPENDING POWER & 10TH AMENDMENT ===
  {
    id: 20,
    category: "Spending Power",
    type: "multiple_choice",
    question: "Under South Dakota v. Dole, which is NOT one of the requirements for Congress's conditional spending?",
    options: ["Conditions must be clear and unambiguous", "States must unanimously consent to the conditions", "Conditions must be related to a federal interest", "Spending must be for the general welfare"],
    answer: 1,
    explanation: "The Dole test requires: (1) for the general welfare, (2) clear and unambiguous conditions, (3) conditions related to a federal interest, and (4) no other constitutional bar. There is no unanimity requirement."
  },
  {
    id: 21,
    category: "Spending Power",
    type: "multiple_choice",
    question: "In NFIB v. Sebelius (the Medicaid case), why did the Court strike down the Medicaid expansion?",
    options: ["Congress was essentially coercing states — a 'gun to the head' — by threatening to withdraw existing Medicaid funding", "Medicaid as a whole was unconstitutional because Congress lacked enumerated power to create it", "The Medicaid expansion was insufficiently related to the federal interest in healthcare delivery", "The Medicaid expansion violated the Equal Protection Clause by treating states differently based on compliance"],
    answer: 0,
    explanation: "The Court found the Medicaid expansion coercive because states would lose ALL existing Medicaid funding (about 22% of state budgets) if they refused to expand. This crossed the line from incentive to coercion — unlike Dole's 5% highway funding."
  },
  {
    id: 22,
    category: "Commandeering",
    type: "multiple_choice",
    question: "New York v. United States established that Congress cannot:",
    options: ["Tax the essential governmental activities of state and local governments under the Supremacy Clause", "Preempt state regulatory law by enacting conflicting federal legislation under the Supremacy Clause", "Commandeer state legislatures by ordering them to regulate according to federal instructions", "Offer states conditional financial incentives tied to adoption of federal regulatory standards"],
    answer: 2,
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
    options: ["The 'traditional government function' test provides an effective and workable framework for protecting state sovereignty", "The 'traditional government function' test is unworkable and states are protected by the political process instead", "The 10th Amendment grants states absolute sovereignty over all matters not expressly delegated to Congress", "Congress has no constitutional power to extend federal labor regulations to state government employees"],
    answer: 1,
    explanation: "Garcia overruled National League of Cities, finding the 'traditional government function' test unworkable. Instead, the political process — not courts — should protect state sovereignty. Justice Blackmun was the key switch vote."
  },

  // === SEPARATION OF POWERS ===
  {
    id: 25,
    category: "Separation of Powers",
    type: "multiple_choice",
    question: "Justice Jackson's concurrence in Youngstown created three zones of presidential power. In which zone does the President have the LEAST power?",
    options: ["Zone 1: Acting with congressional authorization", "Zone 3: Acting against Congress's express or implied will", "Zone 4: Acting in foreign affairs", "Zone 2: The 'Twilight Zone' where Congress is silent"],
    answer: 1,
    explanation: "Jackson's Zone 3 — where the President acts incompatibly with Congress's will — is where presidential power is at its 'lowest ebb.' The Youngstown steel seizure fell in this zone because Congress had specifically declined to authorize such seizures."
  },
  {
    id: 26,
    category: "Separation of Powers",
    type: "multiple_choice",
    question: "In Youngstown, Truman's seizure of the steel mills was held unconstitutional primarily because:",
    options: ["The steel mills were foreign-owned enterprises falling outside the scope of domestic executive authority", "The steel workers' union had consented to the government seizure through collective bargaining agreements", "The Korean War had not been formally declared by Congress, depriving the President of war powers authority", "Congress had specifically declined to grant seizure authority, and the President's commander-in-chief power didn't extend to domestic industry"],
    answer: 3,
    explanation: "The Court held Truman lacked authority because Congress had rejected granting seizure power, the Commander-in-Chief role didn't extend to domestic steel mills, and the Take Care Clause only authorizes enforcing existing laws — not making new ones."
  },
  {
    id: 27,
    category: "Separation of Powers",
    type: "multiple_choice",
    question: "The Unitary Executive Theory holds that:",
    options: ["The President has sole control over the executive branch and can remove officers at will", "The judiciary supervises executive branch operations", "Executive power is shared equally among Cabinet members", "Congress controls all executive officers"],
    answer: 0,
    explanation: "The Unitary Executive Theory, dominant today after Seila Law, holds that executive power is vested in the President alone, who must be able to remove executive officers to fulfill the Take Care Clause duties."
  },
  {
    id: 28,
    category: "Separation of Powers",
    type: "multiple_choice",
    question: "In Trump v. United States, the Court created a three-tier framework for presidential immunity. Which tier provides absolute immunity?",
    options: ["Acts within the outer perimeter of presidential responsibility", "Campaign-related activities", "All official acts while in office", "Conclusive and preclusive constitutional powers of the President"],
    answer: 3,
    explanation: "The framework: (1) Absolute immunity for conclusive/preclusive constitutional powers, (2) Presumptive immunity for acts within the outer perimeter of responsibility, (3) No immunity for unofficial acts. The Court also barred juries from considering official acts."
  },
  {
    id: 29,
    category: "Separation of Powers",
    type: "multiple_choice",
    question: "In the 'Decision of 1789,' Madison's position on removal power was that:",
    options: ["The President must be able to fire people because executive power is vested in the President", "Only impeachment could remove officers", "The Senate should play a role in removal", "Congress gets to allocate removal power through the Necessary and Proper Clause"],
    answer: 0,
    explanation: "Madison argued (Camp 3) that because the Vesting Clause places executive power in the President, and the Take Care Clause requires faithful execution of laws, the President needs the power to remove executive officers."
  },

  // === CONSTITUTIONAL INTERPRETATION ===
  {
    id: 30,
    category: "Interpretation",
    type: "multiple_choice",
    question: "Which theory of constitutional interpretation holds that the Constitution's meaning changes as society evolves?",
    options: ["Textualism, which holds that the Constitution's meaning is fixed by the plain text of its provisions", "Positivism, which holds that the Constitution means only what its text and legal precedent establish", "Originalism, which seeks to fix the Constitution's meaning at the time of its ratification", "Living Constitutionalism"],
    answer: 3,
    explanation: "Living Constitutionalism (associated with Thurgood Marshall) holds that the Constitution's meaning evolves with society. This contrasts with Originalism (associated with Scalia), which seeks to fix meaning at the time of ratification."
  },
  {
    id: 31,
    category: "Interpretation",
    type: "multiple_choice",
    question: "The 'dead hand' theory critique argues:",
    options: ["Constitutional amendments are too difficult to pass", "The framers deliberately left the Constitution vague", "Past generations should not dictate how present generations are governed", "The Constitution should be interpreted by judges, not legislators"],
    answer: 2,
    explanation: "The 'dead hand' critique questions why people who lived centuries ago should control present governance. Living constitutionalists use this to argue for evolving interpretation, while originalists respond that the amendment process exists for change."
  },
  {
    id: 32,
    category: "Interpretation",
    type: "multiple_choice",
    question: "Compatibilism in constitutional interpretation holds that:",
    options: ["We should interpret the document historically but apply it taking into account today's realities", "Only the constitutional text matters for interpretation, without reference to history, policy, or precedent", "The Constitution should be interpreted solely by the original public meaning at the time of ratification", "All interpretive methodologies are equally invalid because the Constitution is inherently indeterminate"],
    answer: 0,
    explanation: "Compatibilism bridges originalism and living constitutionalism: interpret the document historically, then apply those principles accounting for modern realities. This avoids the extremes of both approaches."
  },
  {
    id: 33,
    category: "Interpretation",
    type: "multiple_choice",
    question: "Iredell's position (positivism) in Calder v. Bull was that:",
    options: ["The Constitution should change with the times", "The Constitution is the written document and nothing more", "Natural rights exist beyond what's written in the Constitution", "Judges should interpret the Constitution based on moral principles"],
    answer: 1,
    explanation: "Iredell took the positivist view: the Constitution is the text and nothing more. This contrasted with Chase's natural law view that there are rights beyond the written document — setting up a debate that persists today."
  },

  // === INDIVIDUAL RIGHTS & INCORPORATION ===
  {
    id: 34,
    category: "Individual Rights",
    type: "multiple_choice",
    question: "Barron v. Baltimore held that the Bill of Rights:",
    options: ["Applies to both state and federal governments", "Applies only to the federal government, not the states", "Is merely advisory and non-binding", "Can be overridden by state constitutions"],
    answer: 1,
    explanation: "Barron held that the Bill of Rights restricts only the federal government, not the states. This was later changed through the doctrine of incorporation under the 14th Amendment's Due Process Clause."
  },
  {
    id: 35,
    category: "Individual Rights",
    type: "multiple_choice",
    question: "Selective Incorporation (the modern framework) holds that:",
    options: ["Rights that are historically part of our system of justice and necessary to it are incorporated against the states through the 14th Amendment", "All provisions of the Bill of Rights (Amendments 1-8) apply to the states through the 14th Amendment", "Only the First Amendment freedoms of speech, press, and religion are incorporated against the states", "None of the Bill of Rights applies to the states, which retain full sovereignty over individual rights"],
    answer: 0,
    explanation: "Selective Incorporation (Brennan's approach, now dominant) incorporates most — but not all — Bill of Rights protections against the states through the 14th Amendment's Due Process Clause. Exceptions include the grand jury requirement and quartering of soldiers."
  },
  {
    id: 36,
    category: "Individual Rights",
    type: "multiple_choice",
    question: "Justice Black's 'Total Incorporation' theory held that:",
    options: ["Only selected rights apply to the states", "The Bill of Rights applies only to the federal government", "Natural rights beyond the text should also be incorporated", "All of the Bill of Rights (Amendments 1-8) apply to the states, but only those enumerated rights"],
    answer: 3,
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
    options: ["Enslaved people were citizens of the United States entitled to full constitutional rights and protections", "The Missouri Compromise was a valid exercise of congressional power to regulate territories and new states", "Black Americans could not be citizens, and Congress could not abolish slavery without a constitutional amendment", "States had independent sovereign power to emancipate enslaved people who crossed into their territorial borders"],
    answer: 2,
    explanation: "Dred Scott held that Black Americans (free or enslaved) could not be citizens, the Missouri Compromise was unconstitutional (depriving citizens of property under the 5th Amendment), and Congress could not abolish slavery short of an amendment."
  },
  {
    id: 39,
    category: "Reconstruction",
    type: "multiple_choice",
    question: "The Slaughterhouse Cases effectively destroyed which constitutional provision?",
    options: ["The Privileges and Immunities Clause of the 14th Amendment", "The Necessary and Proper Clause of Article I, which grants Congress implied powers beyond enumerated ones", "The Commerce Clause of Article I, Section 8, which grants Congress power to regulate interstate commerce", "The Equal Protection Clause of the 14th Amendment, which prohibits states from denying equal protection"],
    answer: 0,
    explanation: "Slaughterhouse drew a distinction between rights of U.S. citizenship and state citizenship, gutting the Privileges and Immunities Clause. Historians believe this clause was meant to be the primary vehicle for protecting fundamental rights."
  },
  {
    id: 40,
    category: "Reconstruction",
    type: "multiple_choice",
    question: "The Civil Rights Cases (1883) held that the 14th Amendment does NOT empower Congress to:",
    options: ["Regulate the conduct of private citizens", "Pass any civil rights legislation", "Regulate state governments", "Enforce the Equal Protection Clause against states"],
    answer: 0,
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
    options: ["Separate but equal", "Strict scrutiny for racial classifications", "De facto segregation is unconstitutional", "Colorblind constitution"],
    answer: 0,
    explanation: "Plessy upheld racial segregation under the 'separate but equal' doctrine, using a deferential reasonableness standard. Justice Harlan famously dissented that 'the Constitution is colorblind.'"
  },
  {
    id: 43,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "Brown v. Board of Education overruled Plessy primarily on what grounds?",
    options: ["Segregation in public education is inherently unequal due to the stigma it creates", "Historical evidence proved the framers intended integration", "The Commerce Clause required integrated schools", "Plessy was based on incorrect statistical data"],
    answer: 0,
    explanation: "Brown held that segregation in public education generates a feeling of inferiority that affects children's motivation to learn — 'separate educational facilities are inherently unequal.' The Court used a living constitution approach, focusing on the importance of education today."
  },
  {
    id: 44,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "Brown II ordered desegregation:",
    options: ["Immediately, within 30 days", "Only in Southern states", "With 'all deliberate speed' — no firm deadline", "Only for high schools, not elementary schools"],
    answer: 2,
    explanation: "Brown II's 'all deliberate speed' language was intentionally vague and set no deadline. Enforcement was left to district courts. The result was massive resistance, token compliance, and some states closing public schools entirely."
  },
  {
    id: 45,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "Shelley v. Kraemer held that racially restrictive covenants are:",
    options: ["Enforceable only between the original willing parties to the covenant through privity of contract", "Unconstitutional on their face as a violation of the Equal Protection Clause's prohibition on racial classifications", "Only enforceable in Southern states where state constitutions expressly permitted racial covenants", "Not unconstitutional themselves, but judicial enforcement of them constitutes state action violating the Equal Protection Clause"],
    answer: 3,
    explanation: "The covenants themselves weren't unconstitutional (private action), but when courts enforce them, that constitutes state action — meeting the 14th Amendment's 'no state shall' requirement. This was a very realist opinion."
  },
  {
    id: 46,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "In Loving v. Virginia, the Court applied what standard of review to Virginia's ban on interracial marriage?",
    options: ["No formal standard of review was applied, and the Court relied on historical practice alone", "Intermediate scrutiny, requiring an important government interest and substantially related means", "Strict scrutiny — racial classifications require the most rigid scrutiny", "Rational basis review, requiring only a legitimate government interest and rationally related means"],
    answer: 2,
    explanation: "Loving applied strict scrutiny to racial classifications, requiring a compelling government interest and narrow tailoring. The Court found Virginia's claim of 'racial integrity' was just a cover for white supremacy."
  },
  {
    id: 47,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "Washington v. Davis held that to trigger strict scrutiny under the Equal Protection Clause, a plaintiff must show:",
    options: ["A history of discrimination in the jurisdiction", "Discriminatory intent — disparate impact alone is not enough", "Disparate impact alone is sufficient", "Statistical evidence of unequal outcomes"],
    answer: 1,
    explanation: "Washington v. Davis established that mere disparate impact does not trigger strict scrutiny. Discriminatory intent or a facial racial classification is required. Without intent, only rational basis review applies."
  },
  {
    id: 48,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "The anti-classification approach to equal protection holds that:",
    options: ["Classifications are acceptable if they help subordinated groups", "Any racial classification by government is presumptively wrong — the government should be colorblind", "Government should consider race to remedy past discrimination", "Only intentional discrimination against minorities should be scrutinized"],
    answer: 1,
    explanation: "Anti-classification (also called colorblindness) holds that all racial classifications are presumptively unconstitutional, regardless of whether they help or hurt minorities. This is the dominant position today after SFFA."
  },

  // === AFFIRMATIVE ACTION ===
  {
    id: 49,
    category: "Affirmative Action",
    type: "multiple_choice",
    question: "In Grutter v. Bollinger, the Court upheld Michigan Law School's affirmative action program because:",
    options: ["The school had a prior judicial finding of intentional past discrimination warranting race-conscious remedies", "Diversity in higher education is a compelling interest, and holistic, individualized review is narrowly tailored", "The Commerce Clause authorized Congress to mandate diversity requirements in federally funded institutions", "Racial quotas are always constitutional when used to remedy documented patterns of societal discrimination"],
    answer: 1,
    explanation: "Grutter upheld affirmative action in higher education, finding diversity a compelling interest (from Bakke). The law school's holistic review — considering race as one factor among many without quotas — was narrowly tailored."
  },
  {
    id: 50,
    category: "Affirmative Action",
    type: "multiple_choice",
    question: "In SFFA v. Harvard (2023), the Court effectively ended affirmative action by finding that Harvard's program:",
    options: ["Was not properly authorized by Congress under its enforcement power in the 14th Amendment", "Used explicit racial quotas that set aside a fixed number of seats for minority applicants", "Violated the Commerce Clause by regulating admissions activity beyond Congress's enumerated powers", "Failed because its diversity goals were too amorphous, unmeasurable, and involved racial stereotyping"],
    answer: 3,
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
    options: ["Kennedy's concurrence — as the narrower opinion in a plurality", "Roberts's plurality opinion, which commanded the votes of four justices forming the largest bloc", "Thomas's concurrence, which provided the narrowest grounds for the judgment and thus controls", "Breyer's dissent, which garnered significant support and articulated the most persuasive rationale"],
    answer: 0,
    explanation: "With no majority, Kennedy's concurrence controls as the narrowest ground. Kennedy allowed race-conscious policies (like school siting and redistricting) but not individual race-based assignments."
  },

  // === SUBSTANTIVE DUE PROCESS ===
  {
    id: 53,
    category: "Due Process",
    type: "multiple_choice",
    question: "Lochner v. New York struck down a maximum hours law for bakers on what basis?",
    options: ["The law violated the Equal Protection Clause by treating bakers differently from other similar professions", "The Commerce Clause did not authorize New York to regulate purely intrastate labor conditions", "The state lacked sufficient police power to regulate private employment contracts between willing parties", "The law violated a fundamental right to contract found in the 14th Amendment's Due Process Clause"],
    answer: 3,
    explanation: "Lochner found an unenumerated right to contract in the 14th Amendment's Due Process Clause (substantive due process). The Court held the bakery hours law was really a labor regulation, not a legitimate health measure."
  },
  {
    id: 54,
    category: "Due Process",
    type: "multiple_choice",
    question: "The Lochner Court identified two problems with the maximum hours law:",
    options: ["Lack of explicit congressional authorization combined with the absence of formal presidential approval", "Paternalism (bakers can take care of themselves) and redistribution (taking from employers to give to employees)", "First Amendment free speech and assembly concerns raised by restrictions on workers' contractual freedom", "Federalism principles and the Supremacy Clause, which limited state authority over labor regulation"],
    answer: 1,
    explanation: "Lochner's majority had two objections: (1) Paternalism — bakers are 'sui juris' and don't need protection, and (2) Redistribution — the law takes from employers (or other workers) and gives to the regulated workers."
  },
  {
    id: 55,
    category: "Due Process",
    type: "multiple_choice",
    question: "In West Coast Hotel v. Parrish (1937), the Court upheld a minimum wage law for women, effectively ending the Lochner era by:",
    options: ["Finding that women are biologically different from men and therefore need special legislative protection", "Declaring that the 14th Amendment's protections apply exclusively to racial classifications", "Holding that freedom of contract is not in the Constitution and recognizing women's unequal bargaining power", "Ruling that the 19th Amendment eliminated all legal distinctions between men and women in every context"],
    answer: 2,
    explanation: "West Coast Hotel took a realist view: freedom of contract isn't in the Constitution, and women have unequal market bargaining power. This overruled Adkins and marked the end of Lochner-era economic substantive due process."
  },
  {
    id: 56,
    category: "Due Process",
    type: "multiple_choice",
    question: "Williamson v. Lee Optical is significant because the Court:",
    options: ["Required the legislature to compile and present detailed factual findings justifying each regulation", "Applied strict scrutiny to the economic regulation, requiring a compelling interest and narrow tailoring", "Used 'might have' and 'may have' language, deferring entirely to the legislature under rational basis review", "Struck down the optical regulation as an unreasonable exercise of state police power lacking rational basis"],
    answer: 2,
    explanation: "Lee Optical represents the modern approach: the Court uses 'might/may have concluded' language, fully deferring to the legislature. The Court has not struck down a law for economic substantive due process since 1936."
  },

  // === STANDARDS OF REVIEW ===
  {
    id: 57,
    category: "Standards of Review",
    type: "multiple_choice",
    question: "Under strict scrutiny, the government must show:",
    options: ["An important interest and substantially related means", "A compelling interest and narrowly tailored means", "Any rational basis for the classification", "A legitimate interest and rationally related means"],
    answer: 1,
    explanation: "Strict scrutiny (applied to racial classifications and fundamental rights) requires a compelling government interest and narrowly tailored means — the highest level of review."
  },
  {
    id: 58,
    category: "Standards of Review",
    type: "multiple_choice",
    question: "Intermediate scrutiny applies to classifications based on:",
    options: ["Age and disability", "Sex/gender", "Economic activity", "Race and national origin"],
    answer: 1,
    explanation: "Intermediate scrutiny (from Craig v. Boren) applies to sex-based classifications, requiring an important government interest and substantially related means."
  },
  {
    id: 59,
    category: "Standards of Review",
    type: "multiple_choice",
    question: "Carolene Products Footnote 4 suggests heightened judicial scrutiny may be appropriate in which situations?",
    options: ["When legislation restricts Bill of Rights, interferes with political processes, or targets discrete and insular minorities", "Any case the Court deems to involve significant political questions affecting the democratic process", "Only cases involving foreign affairs where the political branches have primary constitutional authority", "Only cases involving economic regulation where property rights are directly at stake"],
    answer: 0,
    explanation: "Footnote 4 identifies three situations for heightened scrutiny: (1) legislation restricting Bill of Rights, (2) interference with political processes, and (3) laws directed at religious, racial, or other 'discrete and insular minorities.'"
  },

  // === SEX DISCRIMINATION ===
  {
    id: 60,
    category: "Sex Discrimination",
    type: "multiple_choice",
    question: "Craig v. Boren (1976) is important because it:",
    options: ["Applied strict scrutiny to sex classifications", "Required an Equal Rights Amendment before sex could receive heightened scrutiny", "Held that sex discrimination violates the Commerce Clause", "Created intermediate scrutiny as the standard for sex-based classifications"],
    answer: 3,
    explanation: "Craig v. Boren established intermediate scrutiny for sex-based classifications: the government must show an important interest and substantially related means. This was the first time the Court formally applied a standard between rational basis and strict scrutiny."
  },
  {
    id: 61,
    category: "Sex Discrimination",
    type: "multiple_choice",
    question: "In United States v. Virginia (VMI case), Justice Ginsburg required an 'exceedingly persuasive' justification, which:",
    options: ["Is identical to rational basis review", "Is a brand new standard replacing all three tiers", "Only applies to military schools", "Pushes intermediate scrutiny closer to strict scrutiny"],
    answer: 3,
    explanation: "Ginsburg's 'exceedingly persuasive justification' language appeared to heighten intermediate scrutiny for sex classifications, pushing it closer to strict scrutiny. She also required the government's ACTUAL justification, not post-hoc rationalizations."
  },
  {
    id: 62,
    category: "Sex Discrimination",
    type: "multiple_choice",
    question: "In Nguyen v. INS, the Court upheld different citizenship requirements for children of citizen mothers vs. citizen fathers because:",
    options: ["The 14th Amendment's equal protection guarantee does not extend to immigration and citizenship matters", "It was based on racial and ethnic differences between the parents that justified differential treatment", "The law imposed identical requirements on both citizen mothers and citizen fathers without distinction", "It was based on 'real' reproductive differences — mothers have biological proof of parentage at birth"],
    answer: 3,
    explanation: "The Court found the law was based on real biological differences: mothers have proof of parentage at birth while fathers may not. The two interests were (1) biological relationship and (2) opportunity to develop an actual relationship."
  },

  // === KOREMATSU & FOOTNOTES ===
  {
    id: 63,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "Korematsu v. United States is significant for establishing what standard, even though the Court upheld the Japanese internment?",
    options: ["Rational basis review, requiring only a legitimate government interest and rationally related means", "The political question doctrine", "Intermediate scrutiny, requiring an important government interest and substantially related means", "Strict scrutiny / 'most rigid scrutiny' for racial classifications"],
    answer: 3,
    explanation: "Despite upholding internment, Korematsu announced that racial classifications are subject to 'the most rigid scrutiny.' Justice Jackson's dissent warned the Court was setting dangerous precedent. The case was later overruled by SFFA."
  },
  {
    id: 64,
    category: "Equal Protection",
    type: "multiple_choice",
    question: "The distinction between 'de jure' and 'de facto' segregation is:",
    options: ["De jure segregation results from private choices and market forces; de facto results from government action", "De jure is segregation by law; de facto is segregation resulting from factors other than law", "Both terms describe the same phenomenon of racial separation and are used interchangeably in legal analysis", "De jure segregation applies exclusively to public schools while de facto applies only to residential housing"],
    answer: 1,
    explanation: "De jure segregation is imposed by law (state action). De facto segregation results from private choices, economic factors, and housing patterns. The Constitution clearly prohibits de jure; whether it requires remedying de facto is debated."
  },

  // === LOCHNER ERA & FORMALISM VS. REALISM ===
  {
    id: 65,
    category: "Interpretation",
    type: "multiple_choice",
    question: "Legal formalism views the law as:",
    options: ["A logical, coherent system with correct answers, like math and science", "Always indeterminate and subject to manipulation", "Only meaningful in its historical context", "A tool of social engineering that should be evaluated by its real-world effects"],
    answer: 0,
    explanation: "Formalism treats law as a logical, internally coherent system with deterministic right answers. Realism, by contrast, recognizes that most hard cases involve policy judgments and that the law should be evaluated by what it actually does in the real world."
  },
  {
    id: 66,
    category: "Due Process",
    type: "multiple_choice",
    question: "What is the significance of the 'Political Process Theory' (John Hart Ely)?",
    options: ["Only Congress has the institutional authority and democratic mandate to interpret the Constitution", "Courts should consistently defer to executive branch interpretations of constitutional provisions", "Courts should police the democratic process to ensure it's working, especially to protect minority rights", "Courts should never interfere with duly enacted legislation regardless of its impact on minorities"],
    answer: 2,
    explanation: "Ely's Political Process Theory (from 'Democracy and Distrust') holds that judicial review is justified when courts police the political process itself — ensuring it's fair and protecting minorities who can't protect themselves through democratic channels."
  },

  // === NFIB (ACA) ===
  {
    id: 67,
    category: "Commerce Clause",
    type: "multiple_choice",
    question: "In NFIB v. Sebelius (ACA case), Chief Justice Roberts held that the individual mandate was NOT valid under the Commerce Clause because:",
    options: ["Healthcare regulation is exclusively a state matter reserved to the states under the 10th Amendment", "Healthcare consumption is not economic activity subject to regulation under the Commerce Clause", "The individual mandate was too narrowly tailored to achieve the government's stated interest in coverage", "Congress can regulate activity but not compel inactivity — it cannot force people to buy insurance"],
    answer: 3,
    explanation: "Roberts drew a line between regulating existing activity and compelling people to engage in commerce. The mandate tried to 'create' commercial activity (forcing purchases), which crossed the line. However, Roberts upheld it as a valid exercise of the taxing power."
  },
  {
    id: 68,
    category: "Commerce Clause",
    type: "true_false",
    question: "NFIB v. Sebelius overruled Wickard v. Filburn.",
    answer: 1,
    explanation: "False. NFIB did NOT overrule any Commerce Clause precedent. J&L, Darby, Wickard, Heart of Atlanta, McClung, Lopez, Morrison, and Raich all remain good law."
  },
  // === EXPANDED COVERAGE: SDP, EP, INDIVIDUAL RIGHTS, EXECUTIVE POWER, 14-5 ===
  {id:69,category:"Lochner Era",type:"multiple_choice",question:"In Lochner v. New York (1905), the Court struck down a maximum-hours law for bakers based on which constitutional provision?",options:["The Privileges and Immunities Clause of Article IV, which protects trade rights between states","The Equal Protection Clause of the Fourteenth Amendment, because bakers were singled out from other laborers","Liberty of contract implied in the Due Process Clause of the Fourteenth Amendment","The Commerce Clause of Article I, since baked goods affected interstate markets"],answer:2,explanation:"Lochner located a 'liberty of contract' in the Fourteenth Amendment's Due Process Clause and held that a maximum-hours law was not a legitimate exercise of police power. The case became the watershed for the substantive due process critique of economic regulation."},
  {id:70,category:"Lochner Era",type:"multiple_choice",question:"West Coast Hotel v. Parrish (1937) is significant because it:",options:["Explicitly overruled Adkins v. Children's Hospital and rejected liberty of contract as a constitutional bar to minimum wage laws","Reaffirmed Lochner's protection of liberty of contract while limiting it to interstate transactions","Applied strict scrutiny to economic regulation for the first time in modern Supreme Court history","Held that the Equal Protection Clause requires equal pay for equal work regardless of sex"],answer:0,explanation:"West Coast Hotel upheld a state minimum-wage law for women, explicitly overruling Adkins. It marked the functional (though not explicit) end of Lochner — the Court has not struck down an economic regulation on substantive due process grounds since."},
  {id:71,category:"Lochner Era",type:"multiple_choice",question:"Williamson v. Lee Optical (1955) is the paradigmatic case for:",options:["Heightened scrutiny of professional licensing schemes that restrict entry into a trade","Extreme deference under rational basis review, asking only what the legislature 'might have' concluded","Strict scrutiny of laws affecting fundamental rights to occupation","Procedural due process review of administrative rulemaking"],answer:1,explanation:"Lee Optical exemplifies post-Lochner deference: the Court asks only whether the legislature 'might have' had a rational basis. The Court has not struck down economic legislation under substantive due process since 1936."},
  {id:72,category:"Standards of Review",type:"true_false",question:"Footnote 4 of Carolene Products suggested heightened judicial scrutiny when legislation interferes with the political process or targets discrete and insular minorities.",answer:0,explanation:"True. Carolene Products Footnote 4 is the foundation of modern tiered scrutiny — proposing more searching review for laws affecting Bill of Rights protections, restricting political processes (e.g., voting rights), or targeting religious, national, or racial minorities."},
  {id:73,category:"Standards of Review",type:"multiple_choice",question:"Korematsu v. United States (1944) is significant in equal protection doctrine because, despite upholding the internment order, it:",options:["First articulated the rational basis test for racial classifications during wartime","Established that 'most rigid scrutiny' applies to racial classifications, planting the seed for modern strict scrutiny","Held that the Fifth Amendment's Due Process Clause does not contain an equal protection component","Created a categorical exception to constitutional review for military necessity"],answer:1,explanation:"Korematsu announced that racial classifications demand 'the most rigid scrutiny' — language that became the strict scrutiny standard. Modern doctrine treats race-based classifications as virtually per se unconstitutional, even though Korematsu itself upheld the order."},
  {id:74,category:"Equal Protection",type:"multiple_choice",question:"Bolling v. Sharpe (1954), decided the same day as Brown, is best known for:",options:["Extending Brown's holding to state colleges and universities, not just K-12 schools","Establishing 'with all deliberate speed' as the remedial standard for school desegregation","'Reverse incorporating' equal protection against the federal government through the Fifth Amendment Due Process Clause","Holding that federal school segregation could be remedied only through congressional, not judicial, action"],answer:2,explanation:"The Fourteenth Amendment binds only states, so its EPC could not directly reach D.C. schools. Bolling 'reverse incorporated' equal protection principles through the Fifth Amendment's Due Process Clause to apply against the federal government."},
  {id:75,category:"State Action",type:"multiple_choice",question:"In Shelley v. Kraemer (1948), the Court held that judicial enforcement of a racially restrictive covenant was unconstitutional because:",options:["The covenants themselves were per se invalid contracts under federal common law","Such covenants violated the Thirteenth Amendment as a badge or incident of slavery","State court enforcement of the private agreement constituted state action satisfying the Fourteenth Amendment","The Civil Rights Act of 1866 expressly prohibited race-based property restrictions"],answer:2,explanation:"Shelley treats judicial enforcement as a but-for state action — arguably the most radical state-action holding ever, since virtually any private discrimination becomes state action when courts enforce it. The doctrine has not been pushed to its logical limit."},
  {id:76,category:"Equal Protection",type:"true_false",question:"Brown II ordered immediate desegregation of public schools with a fixed deadline.",answer:1,explanation:"False. Brown II famously ordered desegregation 'with all deliberate speed' — a vague phrase with no fixed deadline. Critics argue this enabled massive resistance and token compliance throughout the South for over a decade."},
  {id:77,category:"Equal Protection",type:"multiple_choice",question:"Milliken v. Bradley (1977) is best understood as:",options:["Mandating interdistrict busing remedies wherever de facto segregation persists across district lines","Refusing interdistrict desegregation remedies absent proof of an interdistrict constitutional violation","Extending Brown to private religious schools that received any state funding","Applying strict scrutiny to all race-conscious school assignment plans"],answer:1,explanation:"Milliken held that interdistrict remedies require interdistrict violations. Because Detroit's segregation was intradistrict, the remedy could not reach into surrounding (whiter) suburban districts — making meaningful desegregation in many Northern cities effectively impossible."},
  {id:78,category:"Equal Protection",type:"multiple_choice",question:"Washington v. Davis (1976) holds that, under the Equal Protection Clause:",options:["A racially disparate impact alone is sufficient to invalidate a facially neutral law","Racially disparate impact, without discriminatory purpose, does not establish a constitutional violation","All employment tests must be validated as job-related under a strict scrutiny standard","Statistical proof of discrimination shifts the burden to the government to show a compelling interest"],answer:1,explanation:"Washington v. Davis requires discriminatory intent for an EPC violation; disparate impact alone is insufficient. This anti-classification approach is in tension with anti-subordination theory and remains a major constraint on EPC claims today."},
  {id:79,category:"Equal Protection",type:"multiple_choice",question:"Personnel Administrator of Massachusetts v. Feeney (1979) clarified that 'discriminatory intent' under the Equal Protection Clause means:",options:["The decisionmaker was aware that a foreseeable consequence of the law would burden women","The law was chosen 'because of,' not merely 'in spite of,' its adverse effects on a protected group","Any subjective bias by an individual official, even absent legislative intent","A pattern of disparate impact, which is presumed evidence of intent absent rebuttal"],answer:1,explanation:"Feeney heightened Washington v. Davis: intent requires more than volition and awareness of consequences. The legislature must have chosen the law 'because of' its adverse effects on the protected group, not merely 'in spite of' them."},
  {id:80,category:"Equal Protection",type:"multiple_choice",question:"In Loving v. Virginia (1967), Virginia argued its anti-miscegenation law did not violate equal protection because the law applied 'symmetrically' to whites and Blacks. The Court rejected this argument because:",options:["Symmetrical application is irrelevant where the law's only purpose is to maintain White Supremacy","The Fifteenth Amendment categorically prohibits any race-based classification regardless of effect","Virginia had failed to satisfy the rational basis test by showing any legitimate purpose","Federal civil rights statutes preempt state regulation of marriage entirely"],answer:0,explanation:"Loving was the first use of strict scrutiny. The Court found no legitimate overriding purpose independent of invidious racial discrimination — the only justification was preserving White Supremacy, which is not a permissible state interest."},
  {id:81,category:"Standards of Review",type:"multiple_choice",question:"Craig v. Boren (1976) is significant because it:",options:["Applied strict scrutiny to a sex-based classification for the first time","Created the intermediate scrutiny standard for sex-based classifications: substantially related to an important government interest","Held that all sex-based classifications must be analyzed under rational basis review","Established that men cannot bring equal protection claims because they are not a suspect class"],answer:1,explanation:"Craig v. Boren created intermediate scrutiny. The 'near beer' law (banning sale to men under 21 but allowing sale to women under 21) failed because maleness was not a sufficiently good proxy for the state's traffic-safety interest."},
  {id:82,category:"Sex Discrimination",type:"multiple_choice",question:"In United States v. Virginia (1996) (the VMI case), Justice Ginsburg's majority opinion:",options:["Held that all single-sex public education violates the Fourteenth Amendment per se","Required an 'exceedingly persuasive justification' for sex-based classifications, rejecting post-hoc rationalizations","Concluded that VWIL satisfied equal protection because it offered women a comparable cooperative-method education","Adopted strict scrutiny for sex classifications, abandoning intermediate review"],answer:1,explanation:"VMI ratcheted up intermediate scrutiny by demanding an 'exceedingly persuasive justification' and the state's actual (not post-hoc) interests. Overbroad sex-based generalizations are insufficient even if most members of one sex conform to them."},
  {id:83,category:"Sex Discrimination",type:"multiple_choice",question:"In Geduldig v. Aiello (1974), the Court held that excluding pregnancy from a state disability program:",options:["Was unconstitutional sex discrimination requiring intermediate scrutiny","Was not a sex-based classification, but rather a distinction between 'pregnant persons' and 'non-pregnant persons,' triggering only rational basis review","Violated Title VII of the Civil Rights Act, which Congress later amended to overrule the decision","Was justified by the compelling state interest in encouraging childbirth"],answer:1,explanation:"Geduldig held the classification was pregnant vs. non-pregnant — not male vs. female — so only RBR applied. Congress responded by passing the Pregnancy Discrimination Act, defining pregnancy discrimination as sex discrimination under Title VII."},
  {id:84,category:"Affirmative Action",type:"multiple_choice",question:"Adarand Constructors v. Peña (1995) held that:",options:["All racial classifications by federal, state, or local governments are subject to strict scrutiny, regardless of whether the classification is 'benign'","Federal racial classifications receive intermediate scrutiny while state classifications receive strict scrutiny","Race-conscious set-asides for minority contractors are categorically unconstitutional","Affirmative action programs are reviewed under rational basis review when adopted by Congress under Section 5 of the Fourteenth Amendment"],answer:0,explanation:"Adarand applied strict scrutiny across the board to all racial classifications by any level of government, rejecting the prior view that 'benign' federal classifications received less rigorous review. Anti-classification, not anti-subordination, drives the analysis."},
  {id:85,category:"Affirmative Action",type:"multiple_choice",question:"Grutter v. Bollinger (2003) upheld Michigan Law School's race-conscious admissions because:",options:["The school used a points system that gave a fixed numerical bonus for race","Race was used as one factor in a holistic, individualized review aimed at achieving a 'critical mass'","Diversity is a remedial interest tied to specific past discrimination by the school","Strict scrutiny does not apply to admissions decisions at public universities"],answer:1,explanation:"Grutter applied strict scrutiny but deferred to the school's diversity interest. The narrow tailoring required holistic, individualized review with race as one factor — no quotas, but pursuit of a 'critical mass' was permissible. The companion case Gratz struck down Michigan's undergraduate point system as too quota-like."},
  {id:86,category:"Affirmative Action",type:"multiple_choice",question:"In Students for Fair Admissions v. Harvard (2023), the Court held that race-conscious college admissions failed strict scrutiny because:",options:["Diversity is a categorically illegitimate government interest under any circumstances","The asserted interests were too amorphous and unmeasurable, and the programs treated applicants based on stereotypes rather than as individuals","Race-based admissions violate Title VI but not the Equal Protection Clause directly","Higher education had achieved sufficient diversity that affirmative action was no longer necessary"],answer:1,explanation:"SFFA effectively ended race-conscious admissions without explicitly overruling Grutter. The Court raised the bar on 'compelling interest' to require measurability and condemned use of race as stereotyping. The military academies were left as a (temporary) exception."},
  {id:87,category:"Substantive Due Process",type:"multiple_choice",question:"In Griswold v. Connecticut (1965), Justice Douglas's majority opinion located the right to marital privacy in:",options:["The Ninth Amendment's reservation of unenumerated rights to the people","The Privileges and Immunities Clause of the Fourteenth Amendment","'Penumbras' and 'emanations' from specific guarantees in the Bill of Rights","The Equal Protection Clause's prohibition on classifications based on marital status"],answer:2,explanation:"Douglas, hostile to Lochner-style SDP, claimed he was being textualist by finding privacy in 'penumbras' and 'emanations' of enumerated rights. Concurrences offered alternative theories (9th Amendment - Goldberg; 14th SDP - Harlan, who became controlling)."},
  {id:88,category:"Substantive Due Process",type:"multiple_choice",question:"Eisenstadt v. Baird (1972) is significant because it:",options:["Upheld a state ban on contraceptive distribution to unmarried persons under rational basis review","Extended contraceptive rights to unmarried persons, jettisoning Griswold's limiting principles of 'use' and 'marriage'","Located the right to contraception in the Privileges and Immunities Clause rather than substantive due process","Held that contraceptive access could be regulated by Congress under the Commerce Clause"],answer:1,explanation:"Though framed as an EPC case, Eisenstadt was substantive due process in disguise. It rejected Griswold's limits (married couples, use vs. distribution) and reframed the right as the individual's freedom from government intrusion in deciding whether to bear a child."},
  {id:89,category:"Substantive Due Process",type:"true_false",question:"Roe v. Wade (1973) created a trimester framework that prohibited any state regulation of abortion before viability.",answer:1,explanation:"False. Roe permitted regulation to protect maternal health beginning in the second trimester, even before viability. Only in the third trimester (post-viability) could states regulate to protect potential life. The framework was later replaced by Casey's 'undue burden' test."},
  {id:90,category:"Substantive Due Process",type:"multiple_choice",question:"Planned Parenthood v. Casey (1992) reaffirmed the central holding of Roe but:",options:["Replaced the trimester framework with an 'undue burden' standard for previability abortion regulations","Extended Roe's strict scrutiny to all post-viability regulations","Held that Roe was wrongly decided but applied stare decisis to preserve it","Eliminated the state interest in fetal life as a permissible basis for regulation"],answer:0,explanation:"Casey's joint opinion (O'Connor, Kennedy, Souter) preserved Roe's central holding under stare decisis but replaced the rigid trimester framework with the 'undue burden' test for previability regulations. The Court emphasized workability, reliance, and legitimacy concerns."},
  {id:91,category:"Substantive Due Process",type:"multiple_choice",question:"Dobbs v. Jackson Women's Health (2022) overruled Roe and Casey on the ground that:",options:["The Constitution does not confer a right to abortion, and the right is not deeply rooted in the nation's history and tradition","Abortion regulation is the exclusive province of Congress under the Commerce Clause","Stare decisis required overruling because subsequent cases had abandoned Roe's framework","The Equal Protection Clause provides a stronger basis than substantive due process for abortion rights"],answer:0,explanation:"Dobbs applied a Glucksberg-style history-and-tradition test to find no fundamental right to abortion, then applied rational basis review. The opinion echoed West Coast Hotel's overruling of Lochner ('what is this right you speak of?') while maintaining the holding did not threaten other SDP rights — a claim the dissent and Justice Thomas in concurrence both contested."},
  {id:92,category:"Right to Die",type:"multiple_choice",question:"In Cruzan v. Director (1990), the Court held that a state may:",options:["Categorically prohibit the withdrawal of nutrition from any incompetent patient","Require 'clear and convincing evidence' of an incompetent patient's wish to refuse life-sustaining treatment","Authorize physician-assisted suicide for terminally ill patients","Defer entirely to family members' decisions about end-of-life care"],answer:1,explanation:"Cruzan assumed (without holding) that competent persons have a right to refuse treatment, but allowed states to require clear and convincing evidence of an incompetent patient's prior wishes — putting a thumb on the scale toward preserving life."},
  {id:93,category:"Right to Die",type:"multiple_choice",question:"Washington v. Glucksberg (1997) held that:",options:["There is a fundamental right to physician-assisted suicide rooted in the Due Process Clause","There is no fundamental right to physician-assisted suicide; states may prohibit it under rational basis review","The right to die is protected by the Privileges and Immunities Clause but not by Due Process","Physician-assisted suicide is permitted only when a competent patient requests it in writing"],answer:1,explanation:"Glucksberg established a narrow, history-focused methodology for identifying fundamental rights — defining the asserted right narrowly (physician-assisted suicide, not 'right to die with dignity') and looking for deep historical roots. This methodology drove Dobbs's analysis."},
  {id:94,category:"Sexual Orientation",type:"multiple_choice",question:"Lawrence v. Texas (2003) overruled Bowers v. Hardwick and:",options:["Held same-sex marriage to be a fundamental right under the Due Process Clause","Struck down a Texas homosexual sodomy statute on Due Process grounds, declining to identify a specific standard of review or fundamental right","Applied strict scrutiny to all sexual-orientation classifications","Decided the case exclusively under the Equal Protection Clause, as Justice O'Connor urged in concurrence"],answer:1,explanation:"Kennedy's majority opinion is famously slippery: it speaks of 'liberty' and strikes down the law on SDP grounds, but never declares a fundamental right or specifies a standard of review — essentially 'SDP with bite,' analogous to RBR with bite under EPC."},
  {id:95,category:"Sexual Orientation",type:"multiple_choice",question:"Romer v. Evans (1996) struck down Colorado's Amendment 2 because the Court found:",options:["Sexual orientation is a suspect classification triggering strict scrutiny","The amendment served no purpose other than animus toward a politically unpopular group, failing even rational basis review","The amendment violated the Privileges and Immunities Clause of Article IV","Colorado lacked authority to amend its constitution on civil rights matters preempted by federal law"],answer:1,explanation:"Romer applied 'RBR with bite' (echoing Moreno and Cleburne): a bare desire to harm a politically unpopular group is not a legitimate state interest. The Court did not declare sexual orientation a suspect class."},
  {id:96,category:"Sexual Orientation",type:"multiple_choice",question:"Obergefell v. Hodges (2015) held that the right to same-sex marriage:",options:["Is protected as a fundamental right under both the Due Process and Equal Protection Clauses of the Fourteenth Amendment","Is protected only by the Equal Protection Clause, as a sex-based classification","Was created by Congress under Section 5 of the Fourteenth Amendment, not the Constitution itself","Is a state-law right that cannot be enforced against private religious institutions"],answer:0,explanation:"Kennedy grounded Obergefell in both DP (marriage as a fundamental right that evolves with tradition) and EP (history of discrimination against gays and lesbians). The dissents emphasized the historical definition of marriage and judicial activism."},
  {id:97,category:"Sexual Orientation",type:"multiple_choice",question:"In United States v. Skrmetti (2025), the Court upheld Tennessee's ban on certain transgender medical treatments for minors, applying:",options:["Strict scrutiny because the law turned on a sex-based classification","Intermediate scrutiny but found the law substantially related to protecting minors","Rational basis review, on the ground that the law classified by age and medical use, not sex","A new 'undue burden' test specific to medical regulation of minors"],answer:2,explanation:"Roberts concluded the law classified by age and medical diagnosis, not sex — so RBR applied. The Court also declined to recognize transgender status as a quasi-suspect class. The dissent argued (echoing Loving and Bostock) that the law facially turned on sex."},
  {id:98,category:"Removal Power",type:"multiple_choice",question:"Humphrey's Executor v. United States (1935) held that:",options:["The President has unlimited at-will removal power over all executive officers","The President's removal power does not extend at will to officials performing quasi-legislative or quasi-judicial functions","Congress may make any executive officer removable only with Senate consent","The Necessary and Proper Clause prohibits any limits on presidential removal power"],answer:1,explanation:"Humphrey's Executor allowed Congress to insulate FTC commissioners from at-will removal. It carved a narrow exception to Myers v. United States, which had recognized broad presidential removal power over purely executive officers."},
  {id:99,category:"Removal Power",type:"multiple_choice",question:"Seila Law v. CFPB (2020) held that:",options:["The CFPB's structure was constitutional under Humphrey's Executor's protections for independent agencies","It violates separation of powers for an executive agency to be headed by a single director removable by the President only for cause","The President has no removal power over heads of independent agencies created by Congress","Article II's Vesting Clause is purely ceremonial and imposes no limits on agency design"],answer:1,explanation:"Seila Law cabined Humphrey's Executor to its facts (multimember bodies with quasi-legislative/judicial functions) and reflects the rise of Unitary Executive Theory. Kagan's dissent argued the majority overweighted the Vesting Clause and ignored historical practice."},
  {id:100,category:"Executive Power",type:"multiple_choice",question:"Trump v. United States (2024) established that a former President has:",options:["No immunity from criminal prosecution for any conduct during the presidency","Absolute immunity for official acts within the President's exclusive constitutional authority, presumptive immunity for other official acts, and no immunity for unofficial acts","Absolute immunity for all conduct, official or unofficial, occurring during the presidency","Immunity only for acts authorized by Congress under the Take Care Clause"],answer:1,explanation:"Trump created a three-tier framework and forbade juries from considering official acts as evidence of unofficial conduct. Roberts borrowed Jackson's Youngstown analysis: 'preclusive and conclusive' presidential power gets absolute immunity; the outer perimeter gets presumptive immunity."},
  {id:101,category:"Executive Power",type:"multiple_choice",question:"United States v. Curtiss-Wright (1936) is best known for its dicta:",options:["Limiting executive power in foreign affairs to those specifically enumerated in Article II","Recognizing broad inherent executive power in foreign affairs, on textual, historical, and functional grounds","Holding that war powers are reserved exclusively to Congress under Article I","Establishing that all executive agreements require Senate ratification"],answer:1,explanation:"Curtiss-Wright argued foreign affairs powers passed directly from England to the United States as a sovereign — and so were never carved out from the states. The dicta supports broad executive authority in international (vs. domestic) matters."},
  {id:102,category:"Incorporation",type:"multiple_choice",question:"McDonald v. City of Chicago (2010) held that the Second Amendment:",options:["Applies only to the federal government and cannot be incorporated against the states","Is incorporated against the states through the Fourteenth Amendment Due Process Clause as a fundamental right deeply rooted in history and tradition","Was incorporated through the Privileges and Immunities Clause, the rationale adopted by a majority of the Court","Protects a collective right of state militias, not an individual right"],answer:1,explanation:"Alito's plurality used Glucksberg-style selective incorporation through the Due Process Clause. Justice Thomas concurred in the judgment but argued (alone) that incorporation should run through the Privileges and Immunities Clause, urging Slaughterhouse be overruled."},
  {id:103,category:"Wealth & Fundamental Rights",type:"multiple_choice",question:"San Antonio Independent School District v. Rodriguez (1973) held that:",options:["Education is a fundamental right requiring strict scrutiny of any unequal funding scheme","Wealth is a suspect classification triggering heightened scrutiny","Education is not a fundamental right under the Fourteenth Amendment, and disparities in school funding are reviewed under rational basis","States must equalize per-pupil expenditures across districts under the Equal Protection Clause"],answer:2,explanation:"San Antonio is the death knell of 'fundamental rights equal protection' (FREP) for wealth. The Court rejected both education as a fundamental right and wealth as a suspect class. Marshall's dissent urged a 'nexus' approach to fundamental rights that the majority refused."},
  {id:104,category:"14th Amendment Enforcement",type:"multiple_choice",question:"In City of Boerne v. Flores (1997), the Court struck down RFRA as applied to states because:",options:["Congress lacks any power to enforce the First Amendment against the states","RFRA exceeded Congress's Section 5 power by attempting to define the substance of constitutional rights, rather than enforcing them through 'congruent and proportional' means","The Free Exercise Clause is not incorporated against the states","The statute violated the Establishment Clause by giving special treatment to religion"],answer:1,explanation:"Boerne created the 'congruence and proportionality' test for Section 5 legislation. Congress can remediate and prevent constitutional violations, but cannot redefine the substance of rights — that is the Court's role under Marbury. The case vindicates Harlan's dissent in Katzenbach v. Morgan."}
    ]
  },
  "Property Law": {
    emoji: "🏠",
    color: "#059669",
    questions: [
  {id:1,category:"Property Theory",type:"multiple_choice",question:"Blackstone's view of property is best described as:",options:["Property comes from natural law and involves the right to exclude", "Property is whatever the court says it is", "Property is purely about economic efficiency", "Property is a bundle of rights created by government"],answer:0,explanation:"Blackstone held that property comes from natural law and God, is defined by nature, and centers on exclusion — no one, including the government, can intervene. This is a highly libertarian, formalist view."},
  {id:2,category:"Property Theory",type:"multiple_choice",question:"Legal Realists like Robert Hale view property as:",options:["Immutable categories defined by natural law that cannot be altered by human institutions", "Solely about the absolute right to exclude others, with no room for government regulation", "Natural rights that exist independently of and prior to any government institution or legal framework", "A bundle of rights where government determines and shapes property rights"],answer:3,explanation:"Legal Realists see property as created by government and society, not nature. Hale argued that the government is always involved in property distribution — there is no escape from government in property law."},
  {id:3,category:"Property Theory",type:"multiple_choice",question:"The 'New Essentialists' (Merrill & Smith) argue that property is primarily about:",options:["Exclusion, but from a positivist (not natural law) perspective that allows contextual determinations", "A system of contractual obligations between parties, governed entirely by agreement and consideration", "The equitable redistribution of resources among community members based on need and social utility", "Whatever the legislature determines through the democratic process, with no inherent structure"],answer:0,explanation:"Merrill & Smith hold that property is mainly about exclusion, but unlike Blackstone, they are positivists — law is created by the state. They allow for contextual determinations and government intervention while arguing property should have a definable essence."},
  {id:4,category:"Property Theory",type:"multiple_choice",question:"Robert Hale's key insight about property and coercion is that:",options:["Only formal government action through legislation and enforcement constitutes legal coercion", "Property rights exist in the shadow of government intervention — both sides use state-backed coercion", "The free market operates as a natural institution independent of government intervention or legal frameworks", "Coercion is limited to the criminal law context and has no relevance to property distribution"],answer:1,explanation:"Hale argued property rights are always shaped by government. Both owners and workers use state-backed coercive power. The government either takes over decision-making or defers to the owner — either way you cannot escape the government."},
  {id:5,category:"Property Theory",type:"multiple_choice",question:"The 'constitutive' vs. 'instrumental' distinction means:",options:["Whether the government affirmatively created and granted the property right through legislation", "Whether the property is classified as real property (land) or personal property (chattels)", "Whether the property was obtained through arms-length purchase or through gratuitous transfer", "Whether an object is fundamental to identity (constitutive) or merely useful for goals (instrumental)"],answer:3,explanation:"A grandmother's brooch may be constitutive — part of who you are. A bus ticket is instrumental — it facilitates something. This matters for connection-based theories of property."},
  {id:6,category:"Acquisition",type:"multiple_choice",question:"In Pierson v. Post, the majority held that property in a wild animal requires:",options:["Actual capture, mortal wounding, or maiming plus pursuit (occupancy)", "A reasonable prospect of imminent capture, judged by community standards and custom", "Mere pursuit of the animal, even if diligent and sustained over a significant distance", "Ownership of the land where the animal is located, which creates constructive possession"],answer:0,explanation:"The majority required 'occupancy' — actual capture, mortal wounding, or maiming with continued pursuit. Mere pursuit was insufficient."},
  {id:7,category:"Acquisition",type:"multiple_choice",question:"The dissent in Pierson v. Post argued for a different standard primarily based on:",options:["Custom among hunters, public policy (foxes are pests), and desert/effort theory", "The Constitution's property protections and Fifth Amendment takings principles", "Natural law principles establishing inherent rights of first pursuit and prior claim", "International treaty obligations governing the allocation of wild resources and chattels"],answer:0,explanation:"Livingston's dissent relied on hunter customs, utilitarian public policy (foxes are bad), and desert-effort theory (Post did the hard work). He would have used a 'reasonable prospect of capture' standard."},
  {id:8,category:"Acquisition",type:"multiple_choice",question:"In Johnson v. M'Intosh, the Doctrine of Discovery meant:",options:["Title belonged to whichever sovereign could effectively defend and maintain control over the territory", "Physical occupation and cultivation of the land established full fee simple ownership", "Native Americans held no cognizable property rights under either European or American legal systems", "First European nation to discover land got title; Native Americans kept possession/use but not full title or right to transfer"],answer:3,explanation:"Discovery gave the discovering European nation title; Native Americans retained possession and use but could not transfer title to anyone other than the discovering sovereign."},
  {id:9,category:"Acquisition",type:"true_false",question:"In Johnson v. M'Intosh, the dispute was fabricated so the parties could get a judicial answer about land ownership.",answer:0,explanation:"True. The dispute was fabricated — Johnson even picked opposing counsel. They wanted a definitive answer about who owned the land."},
  {id:10,category:"Creation & Accession",type:"multiple_choice",question:"In INS v. AP, the Court held that property rights in news exist:",options:["Permanently against all persons, creating an absolute property right in factual reporting", "News can never constitute property because facts belong to the public domain once published", "Only in 'hot news,' only against competitors, and only when there is unnecessary/unfair injury", "Only for printed newspaper articles that are registered under federal copyright statutes"],answer:2,explanation:"The Court created a narrow quasi-property right: (1) in hot news, (2) against competitors only, (3) when there is unnecessary or unfair injury. This is relative property."},
  {id:11,category:"Creation & Accession",type:"multiple_choice",question:"The Principle of Accession holds that:",options:["The smaller/subordinate resource follows the greater/dominant resource", "The government always gets the property", "First in time, first in right", "Stolen property always returns to the original owner"],answer:0,explanation:"The lesser follows the greater. A calf follows the cow's owner; a chandelier follows the house."},
  {id:12,category:"Creation & Accession",type:"multiple_choice",question:"Under the Doctrine of Accession (Wetherbee), when can a transformer of stolen materials keep the product?",options:["Whenever any amount of labor is added, regardless of whether the materials are transformed", "When materials are changed to a different species and not willfully taken, OR when labor adds substantially more value", "Only if they compensate the original owner at triple the fair market value of raw materials", "News can never constitute property because facts belong to the public domain once published"],answer:1,explanation:"Under the civil law rule, materials changed to a different species AND not willfully taken may be kept (with payment for materials). The relative value test also matters."},
  {id:13,category:"Creation & Accession",type:"multiple_choice",question:"The Ad Coelum rule was limited in Hinman to:",options:["Whatever airspace the FAA designates as navigable, with all remaining space belonging to the owner", "Only the first ten feet below the surface, beyond which mineral rights revert to the state", "Exactly 500 feet above the surface, which is the statutory boundary for ownership claims", "The extent the owner can use, what is necessary/convenient, and whether use/enjoyment of surface is destroyed"],answer:3,explanation:"Hinman limited ad coelum to practical boundaries: as far as you can use, necessary and convenient, and whether intrusion destroys use and enjoyment of the surface."},
  {id:14,category:"Creation & Accession",type:"multiple_choice",question:"New York's MARIA test for fixtures stands for:",options:["Mortgage, Assessment, Recording, Insurance, Alienation", "Material, Age, Replacement, Installation, Abandonment", "Market, Appraisal, Regulation, Intent, Agreement", "Method of attachment, Adaptability, Relationship of parties, Intention, Agreement"],answer:3,explanation:"MARIA = Method of attachment, Adaptability, Relationship of the parties, Intention, and Agreement."},
  {id:15,category:"Adverse Possession",type:"multiple_choice",question:"The elements of adverse possession are:",options:["Filing a formal deed with the county recorder and paying property taxes for the statutory period", "Just continuous, uninterrupted use for any length of time, regardless of other elements", "Obtaining the owner's initial permission and then remaining on the property beyond the agreed term", "Claim of ownership, actual/hostile possession, open/notorious/visible, continuous/uninterrupted, exclusive, and peaceful"],answer:3,explanation:"All six elements must be met for the statutory period: claim of ownership, actual/hostile possession, open/notorious/visible, continuous/uninterrupted, exclusive, and peaceful."},
  {id:16,category:"Adverse Possession",type:"true_false",question:"Adverse possession can be maintained against the federal government.",answer:1,explanation:"False. Adverse possession cannot be maintained against federal or most state governments."},
  {id:17,category:"Adverse Possession",type:"multiple_choice",question:"'Tacking' in adverse possession means:",options:["Paying accumulated back taxes on the property, which automatically transfers possessory rights", "Adding a fence or other physical boundary marker to delineate the claimed area", "Combining successive periods by parties in privity to meet the statutory period", "Filing successive quiet title actions that together establish the required statutory period"],answer:2,explanation:"Tacking allows combining periods if parties are in privity (sale, lease, inheritance). Without privity, periods cannot be tacked."},
  {id:18,category:"Protection of Property",type:"multiple_choice",question:"Berg v. Wiley established that for real property where the landlord lacks possession:",options:["Deadly force is acceptable to protect real property against any unauthorized entry or occupation", "The landlord retains the right to change locks and deny access whenever the lease is breached", "Self-help is generally not permitted — landlords must use judicial process", "Self-help remedies are always permitted for landlords exercising their contractual re-entry rights"],answer:2,explanation:"Landlords cannot use self-help to regain possession. They must go through judicial process."},
  {id:19,category:"Protection of Property",type:"multiple_choice",question:"Self-help repossession of personal property (Williams v. FMCC) is permitted only if:",options:["The debtor provides written consent before each individual repossession attempt is made", "The personal property at issue has a fair market value of less than $5,000 at time of repossession", "A court order authorizing repossession is obtained through summary judicial proceedings", "The creditor has a security interest and there is no breach of the peace"],answer:3,explanation:"For secured personal property under the UCC, self-help is allowed with a security interest AND no breach of the peace."},
  {id:20,category:"Trespass & Nuisance",type:"multiple_choice",question:"Trespass to real property is strict liability, meaning:",options:["No showing of actual damages is required — any unauthorized physical entry onto the land suffices", "The trespasser must cause damages exceeding a statutory minimum threshold to sustain the action", "Only criminal trespass prosecuted by the state creates a cognizable property law remedy", "The plaintiff must demonstrate that the trespasser had specific intent to cause harm to the land"],answer:0,explanation:"Any unauthorized physical entry is actionable regardless of intent or actual damages."},
  {id:21,category:"Trespass & Nuisance",type:"multiple_choice",question:"In Jacques, punitive damages for trespass were awarded because:",options:["The trespasser had substantial financial resources making compensatory damages insufficient deterrent", "The jury was improperly influenced by local sympathies favoring the long-term property owners", "Protecting the right to exclude has dignitary value and deters bad behavior", "The trespass occurred during nighttime hours, triggering enhanced statutory damages provisions"],answer:2,explanation:"The right to exclude has inherent dignitary value. Punitive damages deter intentional trespass and prevent self-help."},
  {id:22,category:"Trespass & Nuisance",type:"multiple_choice",question:"The key distinction between trespass and nuisance is:",options:["They are functionally identical causes of action with the same elements and remedies available", "Trespass is exclusively a criminal offense while nuisance exists solely as a civil cause of action", "Trespass requires specific intent to enter the land while nuisance imposes strict liability", "Trespass protects possession (tangible/direct); nuisance protects use and enjoyment (significant/unreasonable harm)"],answer:3,explanation:"Trespass = possessory interest, tangible/direct, strict liability. Nuisance = use/enjoyment, significant/unreasonable harm, cost-benefit balancing."},
  {id:23,category:"Trespass & Nuisance",type:"multiple_choice",question:"The Coase Theorem suggests that:",options:["Government intervention is always inefficient because private ordering produces superior outcomes", "Courts should always award injunctive relief to the plaintiff who suffered the nuisance harm", "The tort of nuisance should be abolished in favor of direct government regulation of land use", "If property rights are well-defined and transaction costs low, parties bargain to efficient outcome regardless of initial entitlement"],answer:3,explanation:"Coase: with clear rights and low transaction costs, private bargaining produces efficient outcomes regardless of initial allocation."},
  {id:24,category:"Trespass & Nuisance",type:"multiple_choice",question:"In Boomer v. Atlantic Cement, the 'conditional injunction' meant:",options:["The factory must cease all operations immediately with no opportunity to pay damages instead", "The plaintiff must relocate because the coming-to-the-nuisance doctrine bars any recovery", "Nuisance enjoined UNLESS defendant pays permanent damages to continue", "The case is dismissed because industrial operations cannot constitute a private nuisance as a matter of law"],answer:2,explanation:"Boomer = liability rule. Plaintiff got the entitlement but defendant could pay to continue. Rule 2 in Calabresi-Melamed."},
  {id:25,category:"Trespass & Nuisance",type:"multiple_choice",question:"In Spur v. Del Webb, the unusual remedy was:",options:["The developer must tear down the residential homes and restore the land to agricultural use", "The coming-to-the-nuisance doctrine was applied to bar the developer's claim entirely", "Feedlot must move BUT developer must indemnify the feedlot owner", "Both parties are required to enter binding mediation before any judicial remedy can be ordered"],answer:2,explanation:"Rule 4: feedlot must move (public nuisance) but developer who 'came to the nuisance' must pay relocation costs."},
  {id:26,category:"Landlord-Tenant",type:"multiple_choice",question:"The four types of landlord-tenant relationships are:",options:["Fee simple, life estate, remainder, reversion", "Joint tenancy, TIC, tenancy by entirety, community property", "Lease, license, easement, covenant", "Term of years, periodic, tenancy at will, tenancy at sufferance"],answer:3,explanation:"They differ in how they end: term of years (fixed end), periodic (rolls over, notice needed), at will (either party ends), at sufferance (holdover)."},
  {id:27,category:"Landlord-Tenant",type:"multiple_choice",question:"The implied warranty of habitability:",options:["Has been a fundamental part of common law landlord-tenant doctrine since the medieval period", "Applies primarily to commercial lease agreements where tenants lack residential protections", "Can always be waived by express agreement between the landlord and tenant in the lease", "Often cannot be waived, is based on housing codes, and applies to residential leases"],answer:3,explanation:"Emerged in 1960s-70s, often unwaivable, based on housing codes, residential leases only. Commercial uses constructive eviction."},
  {id:28,category:"Landlord-Tenant",type:"multiple_choice",question:"The difference between assignment and sublease is:",options:["In assignment, entire interest transfers and landlord has privity with new tenant; in sublease, original tenant plans to return", "A sublease transfers a greater bundle of rights to the new occupant than an assignment does", "They are functionally identical causes of action with the same elements and remedies available", "An assignment requires prior court approval and formal judicial transfer of the lease interest"],answer:0,explanation:"Assignment = entire remaining interest transferred, landlord has direct relationship with assignee. Sublease = original tenant retains interest, no direct landlord-subletter relationship."},
  {id:29,category:"Recording Systems",type:"multiple_choice",question:"Under a 'notice' recording system:",options:["Subsequent GFPV who LACKS notice gets the property", "The first purchaser to record their deed prevails regardless of notice or good faith", "Only government entities and licensed title companies may record instruments in land records", "Recording instruments has no legal effect on priority between competing claims to title"],answer:0,explanation:"In notice, a subsequent bona fide purchaser for value without notice prevails. The last GFPV wins."},
  {id:30,category:"Recording Systems",type:"multiple_choice",question:"Under 'race-notice,' to prevail a subsequent purchaser must:",options:["Only demonstrate they lacked notice of the prior conveyance at the time of their purchase", "Pay the highest price among competing purchasers to establish superior claim to title", "Be a subsequent GFPV without notice AND be first to record", "Only be the first to record their deed, regardless of notice or good faith status"],answer:2,explanation:"Race-notice requires BOTH: (1) GFPV without notice AND (2) first to record. If neither meets both, nemo dat applies."},
  {id:31,category:"Recording Systems",type:"multiple_choice",question:"The Shelter Rule provides that:",options:["The government provides automatic protection to all property owners through the recording system", "Recording a deed creates absolute protection against all subsequent claims regardless of fraud", "Anyone purchasing from a GFPV gets protected status even if not a GFPV themselves", "Only the original purchaser in a chain of title receives protection under the recording acts"],answer:2,explanation:"Shelter extends GFPV protection to subsequent purchasers. Exception: does NOT apply when transferred back to original grantor (prevents collusion)."},
  {id:32,category:"Recording Systems",type:"multiple_choice",question:"A 'wild deed' is:",options:["A deed executed outside of a formal legal office, making it potentially voidable for irregularity", "A deed containing unusual or non-standard terms that deviate from the jurisdiction's standard form", "A deed procured through fraud or misrepresentation, rendering it voidable by the grantor", "A recorded deed outside the chain of title because a prior deed was never recorded"],answer:3,explanation:"A wild deed is recorded but unconnectable to the chain of title because a preceding transfer was never recorded."},
  {id:33,category:"Recording Systems",type:"multiple_choice",question:"'Nemo Dat' means:",options:["Recording creates title", "Everyone gets equal rights", "The government controls all titles", "You cannot give title you do not have"],answer:3,explanation:"Nemo dat quod non habet — you cannot transfer greater rights than you possess. GFPV and recording statutes are exceptions."},
  {id:34,category:"Easements",type:"multiple_choice",question:"An easement differs from a license because an easement is:",options:["Only applicable to government-owned property where public access rights are at stake", "Functionally identical to a lease, transferring possessory interest for a specified duration", "Created with writing, non-possessory, irrevocable, enforceable as real interest in land", "Always created through oral agreement and inherently temporary in duration"],answer:2,explanation:"Easements: writing, non-possessory, irrevocable, real property interest. Licenses: revocable, no writing needed, defense to trespass only."},
  {id:35,category:"Easements",type:"multiple_choice",question:"The four negative easements (WALS) are:",options:["Waste, Abandonment, Liability, Servitude", "Water, Air, Light, and Support", "Warranty, Assignment, Lien, Security", "Width, Angle, Length, Setback"],answer:1,explanation:"WALS = Water, Air, Light, Support. These let the dominant owner stop the servient owner from acting."},
  {id:36,category:"Easements",type:"multiple_choice",question:"An easement can be created by all EXCEPT:",options:["Express grant executed in a writing that satisfies the statute of frauds requirements", "Estoppel", "Oral agreement alone with no reliance", "Prescription"],answer:2,explanation:"Easements can be created by writing, prescription, estoppel, implication, or necessity. Oral agreement alone (without reliance triggering estoppel) is insufficient — Statute of Frauds applies."},
  {id:37,category:"Covenants",type:"multiple_choice",question:"For the BURDEN of a real covenant to run with the land:",options:["An informal agreement between neighboring property owners, without any further legal requirements", "Payment of a recording fee to the government and registration in the county land records", "Only recording the covenant in the county land records, with no other elements required", "Intent, horizontal privity, full vertical privity, and touch and concern"],answer:3,explanation:"Burden requires: intent to bind successors, horizontal privity (real estate transaction between originals), full vertical privity (same durational interest), and touch and concern."},
  {id:38,category:"Covenants",type:"multiple_choice",question:"Real covenants vs. equitable servitudes — the key difference is:",options:["Title theory and lien theory are functionally identical and produce the same legal outcomes", "Real covenants must be in a signed writing while equitable servitudes can be created orally", "Real covenants give damages (need horizontal privity); equitable servitudes give injunctions (need notice instead)", "Real covenants apply only to commercial property while equitable servitudes govern residential land"],answer:2,explanation:"Real covenants = damages, require horizontal privity. Equitable servitudes (Tulk v. Moxhay) = injunctions, require notice instead of horizontal privity."},
  {id:39,category:"Mortgages",type:"multiple_choice",question:"Title theory vs. lien theory in mortgages:",options:["Title theory and lien theory are functionally identical and produce the same legal outcomes", "Title theory applies exclusively to commercial properties while lien theory governs residential mortgages", "Title theory: bank holds legal title; lien theory: borrower retains title, bank has a lien", "Under title theory the borrower retains legal title; under lien theory the bank holds legal title"],answer:2,explanation:"Title theory: bank holds legal title. Lien theory: borrower retains legal title, bank has only a lien/security interest."},
  {id:40,category:"Mortgages",type:"multiple_choice",question:"The right of redemption allows:",options:["Borrower to pay what is owed and reclaim property before (or sometimes after) foreclosure", "The government can exercise eminent domain to take the mortgaged property at fair market value", "The borrower can walk away from the mortgage obligation without any financial consequences", "The bank may immediately seize and sell the property upon the borrower's first missed payment"],answer:0,explanation:"Equitable right of redemption lets a defaulting borrower pay full amount and keep the property. Some states extend this past foreclosure sale."},
  {id:41,category:"Concurrent Ownership",type:"multiple_choice",question:"In Delfino v. Vealencis, the court held partition in kind is preferred when:",options:["The property in question is primarily used for commercial purposes rather than residential", "Physical division is practicable and serves the parties' interests", "The fair market value of the property exceeds the statutory threshold for mandatory sale proceedings", "The co-tenants are related by blood or marriage, which triggers a statutory preference for sale"],answer:1,explanation:"Partition in kind preferred when practicable. Vealencis lived there and ran a business — her interests were served by physical division, not forced sale."},
  {id:42,category:"Fair Housing",type:"multiple_choice",question:"Shelley v. Kraemer held that racially restrictive covenants:",options:["Are always enforceable privately", "Are not unconstitutional themselves, but judicial enforcement constitutes state action violating Equal Protection", "Were abolished by the 13th Amendment", "Are unconstitutional on their face"],answer:1,explanation:"Private covenants aren't unconstitutional (private action), but court enforcement = state action = 14th Amendment violation."},
  {id:43,category:"Fair Housing",type:"multiple_choice",question:"The Fair Housing Act's 'Mrs. Murphy exception' exempts:",options:["University-owned student housing and dormitories operated by educational institutions", "Owner-occupied dwellings with no more than three other families", "All landlords who can demonstrate Irish heritage, for whom the exception was historically named", "Residential properties with an assessed fair market value below the $100,000 statutory threshold"],answer:1,explanation:"Section 3607(2) exempts owner-occupied dwellings with no more than three other families living there."},
  {id:44,category:"Zoning",type:"multiple_choice",question:"Village of Euclid established that zoning is:",options:["A valid exercise of police power, analogized to nuisance prevention", "Always an unconstitutional violation of the Due Process Clause and the Takings Clause", "Limited exclusively to the regulation of commercial and industrial zones within municipalities", "Only permitted when authorized by federal legislation under the Commerce Clause power"],answer:0,explanation:"Euclid upheld zoning as valid police power, analogized to nuisance prevention, subject to a reasonableness test."},
  {id:45,category:"Zoning",type:"multiple_choice",question:"In Mount Laurel, the court held municipalities must:",options:["Provide opportunity for variety and choice of housing, considering welfare of the entire state", "Have absolute and unreviewable discretion over all local zoning decisions within their borders", "Have no independent zoning power because land use regulation is exclusively a state-level function", "Exclude low-income housing whenever inclusion would reduce surrounding residential property values"],answer:0,explanation:"Zoning power comes from the state, so municipalities must consider statewide welfare. Exclusionary zoning violating this is unconstitutional. Effects-based test, not just intent."},
  {id:46,category:"Future Interests",type:"multiple_choice",question:"A fee simple determinable automatically ends when a specified event occurs. The grantor retains a:",options:["Possibility of reverter", "Right of re-entry (power of termination), which requires the grantor to take affirmative action", "A remainder interest, which becomes possessory upon the natural expiration of the prior estate", "A reversionary interest, which returns the estate to the grantor after a lesser estate expires"],answer:0,explanation:"Fee simple determinable + possibility of reverter: estate automatically reverts. Compare fee simple subject to condition subsequent + right of re-entry (grantor must act)."},
  {id:47,category:"Future Interests",type:"multiple_choice",question:"A 'remainder' becomes possessory:",options:["On the natural expiration of the preceding estate", "Immediately upon creation", "Only when the grantor dies", "By cutting short a preceding estate"],answer:0,explanation:"Remainders wait for natural end of prior estate (like life estate ending at death). Executory interests cut short preceding estates."},
  {id:48,category:"Bailments & Licenses",type:"multiple_choice",question:"Wood v. Leadbitter held that a license (like an event ticket) is:",options:["Transferable to heirs and assignees as an incorporeal hereditament that passes with the estate", "Irrevocable once valuable consideration has been paid, creating a binding property interest", "Revocable — unless it accompanies a valid grant", "Functionally the same as an easement, creating a non-possessory interest enforceable against successors"],answer:2,explanation:"A license is revocable. Only exception: when it accompanies a valid grant, making it irrevocable."},
  {id:49,category:"Bailments & Licenses",type:"multiple_choice",question:"A bailment requires:",options:["A completed gift of personal property from one party to another with donative intent", "Possession, control, and custody transferred to the bailee", "A completed sale of goods for consideration under Article 2 of the Uniform Commercial Code", "Only a written contract executed by both parties that satisfies the statute of frauds"],answer:1,explanation:"Bailment = transfer of possession, control, and custody (not ownership). Can be explicit or constructive."},
  {id:50,category:"Transfers",type:"multiple_choice",question:"A gift causa mortis requires:",options:["A verbal declaration of intent to give, which satisfies the donative intent requirement alone", "Only a properly witnessed and executed written will that complies with the statute of wills", "Delivery during donor's lifetime, made in expectation of death from specific cause, and donor must die from that cause", "Filing a formal gift declaration with the county recorder's office and paying the transfer tax"],answer:2,explanation:"Gift causa mortis: (1) delivery during lifetime, (2) in expectation of imminent death, (3) from the specific anticipated cause. Fails if donor survives or dies from different cause."},
  {id:51,category:"Transfers",type:"multiple_choice",question:"The GFPV exception to nemo dat applies when:",options:["The personal property at issue has a market value below the $500 threshold for UCC coverage", "Seller has voidable title (fraud), buyer acts in good faith, and buyer gives value", "The buyer has actual knowledge that the goods were stolen but purchases them at a discount", "The seller obtained the goods through outright theft, giving them void title that cannot pass"],answer:1,explanation:"GFPV protects buyers from sellers with voidable title (fraud). Does NOT protect from void title (theft)."},
  {id:52,category:"Protection of Property",type:"multiple_choice",question:"In State v. Shack, the court held a farmer could not exclude legal aid workers because:",options:["Property rights are malleable and must serve human interests — vulnerable individuals have rights limiting the owner's exclusion", "The farmer had constructively abandoned the property by failing to maintain adequate living conditions", "The migrant workers had acquired possessory rights to the land through their sustained occupation", "The Constitution's public trust doctrine requires all privately owned property to be open to visitors"],answer:0,explanation:"Property rights must serve human interests. The court considered workers' vulnerability, congressional policy, and the fact the landowner invited them. Owner retained rights to exclude solicitors."},
  {id:53,category:"Protection of Property",type:"multiple_choice",question:"In Ploof v. Putnam, the doctrine of necessity:",options:["Applied exclusively to government officials exercising their official regulatory authority", "Created a temporary property right allowing emergency use of another's property that the owner cannot override with self-help", "Permitted a property owner to destroy neighboring improvements that interfered with emergency access", "Created a general right of entry allowing any person to access private property for any purpose"],answer:1,explanation:"Necessity creates a temporary right. The dock owner could not use self-help to remove the boat during the storm. Under Vincent, the person may still owe compensation for damages."},
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
  "Lochner Era": "#A16207", "State Action": "#0E7490", "Substantive Due Process": "#BE185D",
  "Right to Die": "#475569", "Sexual Orientation": "#E11D48", "Removal Power": "#7E22CE",
  "Executive Power": "#1D4ED8", "Incorporation": "#15803D",
  "Wealth & Fundamental Rights": "#A21CAF", "14th Amendment Enforcement": "#B45309",
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
