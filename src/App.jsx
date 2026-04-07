import { useState, useEffect, useCallback } from "react";

const MARVIN_WRONG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABcQERQRDhcUEhQaGBcbIjklIh8fIkYyNSk5UkhXVVFIUE5bZoNvW2F8Yk5QcptzfIeLkpSSWG2grJ+OqoOPko3/2wBDARgaGiIeIkMlJUONXlBejY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY3/wAARCAB4AFwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCeCPy0Rm7fNj1Y9BVLXZxEiWoOZG+eU/yH9avzXEcYkuXH7qEfKP7xrl5pnnmkmlOXckk0yUR9vqaM/KT6mkzwPYUp6gdlFAxO+PSgHv8AgKArNwqkn2FKQVOCCMcAGgYL97PpSdvqaM4XHc0d8elAAewHQUH9BQOtB7CgBO+e9FIetFAG9e4ukjjDFYk5IxyTVU2duo53H6ml38daC2R1rHmZpyojMMAyVizj1Jp6RBh5aRCXzBjYf4SD1z9KimyCADwetTW8yWxIZwJHHGewqrtIlpNkySLANiKAR1xUn2lXwHVSPeoGtpzztBLc5BHNM8vBwVLMOoPb61BZK1tBcsGhgyfUHaKhk02UZC2Zx6q+avWo5ycn6VqxIHUEdPrRzNByo4+WBoSdwII6gjBH1qKuyvbGO6jAfbuH3WPUe30rkbmFreZo3GCDjHpWkZXIcbEJoxTgjlC4VioOCwHAP1pMGrJLobFLvyajJpCcAmsTQlUqzEknPYYqNwFDswDFqdEN+1cFRjmmSYJZeoHSqsSmTWd/JEEjA3qDV5XEjbmyfqazoI9i5/iNXLQbpOTgDk1LLRqWyptJAK+hogumiZkcncrYz60GQRw7zwAOKprKTIWI5YZqBm4HWZCMjJHBrHubOSS4JuEQADBkIBz9KmjkJI2nAq5cRmayIxlhyM0Jg0Y1/P5IEG3ba7CuAOCcfz6Vh5NayW7SWrI7spLgsCMknnNL/Y8cnKXG0dww5zW0dEZtNmfmkflTTQc0q8sAakomAwij2qM8YAFSlwaiJG4EnvTTsS1csjCqAT0q1aBWI2nPcgVk3DMsrYPFT2F00IcnuMCk1oUnqXr653KEXp3qSIb4k9RWUZd8hz9K07SVVIz06CoaKTNC3TGc9avoyrCzP90Ak/Sq6KCwI7ijUH8rTpVzhmXFShswpbhppmKthM8HuRS727ZI9zVaPcRnt/Opx05rYgzXIJ460qtg81GcbsLTwmRjOKBEgx2BoOKRfkwFJP40Nlj1xRYBzJ5iqeh709IuMjpTSwUYqwkirFjHzNQBT2MeQPepA8ibQTjAyCaur5aNGT1JIP0qqdsLt3APGaANG2vHQiadiEAwq9zUF3fNdZB+6TyP6VTeVpm3HIHpSgilYdyT7wzmngnHf86YOafkd6oDNGDyMZqVBkZqV4N2SmATUcYKgqwwRQIWkpTQvNMCNm2uCatQgSkvuHHalNkkqYVyH96ie32SEFGUDoe5oFYVpQRkdjTcGRsscDsKkSFeCnXtuFO34O10GR3HFIYzZ6EH26U4dcYxUisrDB/Cjbg8HNAwAAPFIVwadjPIo69aYEYkGA38J7+lEyjZuPUd/UVno742AbhUzyysOOBjFTYVxxpVbHPft7VGp+QE9ehpwqhEob3qWO4ZeOGX0NVwacGpDLPyHlRt9qcVWYejiq6nFSK3cGgYMm04NOXpR94UDgUwFT72KUrk0i9zU6plaAMKNQW+Y4FWxtdSVAwBxRRQyERLgnHoaceKKKBhnilBoooGSCngUUUAPHFOxRRQMlRMjFWQnFFFAH//2Q==";

const MARVIN_RIGHT = "data:image/jpeg;base64,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";

const questions = [
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
];

const categories = [...new Set(questions.map(q => q.category))];

const categoryColors = {
  "Judicial Review": "#4F46E5",
  "Federalism": "#0891B2",
  "Commerce Clause": "#059669",
  "Spending Power": "#D97706",
  "Commandeering": "#DC2626",
  "Separation of Powers": "#7C3AED",
  "Interpretation": "#DB2777",
  "Individual Rights": "#2563EB",
  "Reconstruction": "#92400E",
  "Equal Protection": "#B91C1C",
  "Affirmative Action": "#6D28D9",
  "Due Process": "#0D9488",
  "Standards of Review": "#EA580C",
  "Sex Discrimination": "#C026D3"
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ConLawQuiz() {
  const [screen, setScreen] = useState("home");
  const [selectedCats, setSelectedCats] = useState(new Set(categories));
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState([]);
  const [retryMode, setRetryMode] = useState(false);

  const startQuiz = useCallback((cats, retry = false, retryQs = []) => {
    const pool = retry ? retryQs : shuffle(questions.filter(q => cats.has(q.category)));
    setQuizQuestions(pool);
    setCurrentIdx(0);
    setSelected(null);
    setShowAnswer(false);
    setResults([]);
    setRetryMode(retry);
    setScreen("quiz");
  }, []);

  const handleSelect = (idx) => {
    if (showAnswer) return;
    setSelected(idx);
  };

  const checkAnswer = () => {
    if (selected === null) return;
    const q = quizQuestions[currentIdx];
    const correct = selected === q.answer;
    setResults(prev => [...prev, { ...q, userAnswer: selected, correct }]);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setScreen("results");
    }
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

  // HOME
  if (screen === "home") {
    return (
      <div style={{
        fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
        maxWidth: 640,
        margin: "0 auto",
        padding: "32px 20px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1a1625 0%, #0f0d15 100%)",
        color: "#e8e4ef"
      }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#8b7fb8",
            marginBottom: 8
          }}>Study Tool</div>
          <h1 style={{
            fontSize: 32,
            fontWeight: 700,
            margin: 0,
            background: "linear-gradient(135deg, #c4b5fd, #f0abfc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2
          }}>Constitutional Law</h1>
          <p style={{ color: "#9a8fc4", fontSize: 14, marginTop: 8 }}>
            {questions.length} questions across {categories.length} topics
          </p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12
          }}>
            <span style={{ fontSize: 13, color: "#a99dd4", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
              Topics
            </span>
            <button onClick={() => {
              if (selectedCats.size === categories.length) setSelectedCats(new Set());
              else setSelectedCats(new Set(categories));
            }} style={{
              background: "none",
              border: "none",
              color: "#c4b5fd",
              fontSize: 12,
              cursor: "pointer",
              padding: 0
            }}>
              {selectedCats.size === categories.length ? "Deselect All" : "Select All"}
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {categories.map(cat => {
              const isOn = selectedCats.has(cat);
              const count = questions.filter(qq => qq.category === cat).length;
              return (
                <button key={cat} onClick={() => toggleCat(cat)} style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: `1.5px solid ${isOn ? categoryColors[cat] || "#6d5faa" : "#2d2640"}`,
                  background: isOn ? `${categoryColors[cat] || "#6d5faa"}22` : "#1e1a2e",
                  color: isOn ? "#e8e4ef" : "#6b5f8a",
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "inherit"
                }}>
                  {cat} <span style={{ opacity: 0.5, fontSize: 11 }}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        <button onClick={() => {
          if (selectedCats.size === 0) return;
          startQuiz(selectedCats);
        }} disabled={selectedCats.size === 0} style={{
          width: "100%",
          padding: "16px 24px",
          borderRadius: 12,
          border: "none",
          background: selectedCats.size === 0 ? "#2d2640" : "linear-gradient(135deg, #7c3aed, #a855f7)",
          color: selectedCats.size === 0 ? "#5a4f7a" : "#fff",
          fontSize: 16,
          fontWeight: 700,
          cursor: selectedCats.size === 0 ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          letterSpacing: 0.5,
          transition: "all 0.2s",
          boxShadow: selectedCats.size > 0 ? "0 4px 24px #7c3aed44" : "none"
        }}>
          Start Quiz — {questions.filter(qq => selectedCats.has(qq.category)).length} Questions
        </button>
      </div>
    );
  }

  // QUIZ
  if (screen === "quiz" && q) {
    const opts = q.type === "true_false" ? ["True", "False"] : q.options;
    const isCorrect = selected === q.answer;

    return (
      <div style={{
        fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
        maxWidth: 640,
        margin: "0 auto",
        padding: "20px 20px 32px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1a1625 0%, #0f0d15 100%)",
        color: "#e8e4ef"
      }}>
        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button onClick={() => setScreen("home")} style={{
            background: "none", border: "none", color: "#8b7fb8", fontSize: 14, cursor: "pointer", padding: 0, fontFamily: "inherit"
          }}>✕</button>
          <div style={{ flex: 1, height: 6, background: "#2d2640", borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #7c3aed, #a855f7)",
              borderRadius: 3,
              transition: "width 0.4s ease"
            }} />
          </div>
          <span style={{ fontSize: 13, color: "#8b7fb8", minWidth: 48, textAlign: "right" }}>
            {currentIdx + 1}/{quizQuestions.length}
          </span>
        </div>

        {/* Category */}
        <div style={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: 6,
          background: `${categoryColors[q.category] || "#6d5faa"}22`,
          border: `1px solid ${categoryColors[q.category] || "#6d5faa"}44`,
          color: categoryColors[q.category] || "#a99dd4",
          fontSize: 11,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 16
        }}>
          {q.category}
        </div>

        {/* Question */}
        <h2 style={{
          fontSize: 20,
          fontWeight: 600,
          lineHeight: 1.5,
          margin: "0 0 28px",
          color: "#f0ecf7"
        }}>
          {q.question}
        </h2>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {opts.map((opt, i) => {
            let bg = "#1e1a2e";
            let border = "#2d2640";
            let col = "#d1cbe3";

            if (selected === i && !showAnswer) {
              bg = "#2d2660";
              border = "#7c3aed";
              col = "#f0ecf7";
            }
            if (showAnswer) {
              if (i === q.answer) {
                bg = "#0a2e1a";
                border = "#22c55e";
                col = "#86efac";
              } else if (i === selected && !isCorrect) {
                bg = "#2e0a0a";
                border = "#ef4444";
                col = "#fca5a5";
              } else {
                col = "#5a4f7a";
              }
            }

            return (
              <button key={i} onClick={() => handleSelect(i)} style={{
                padding: "14px 18px",
                borderRadius: 10,
                border: `1.5px solid ${border}`,
                background: bg,
                color: col,
                fontSize: 15,
                textAlign: "left",
                cursor: showAnswer ? "default" : "pointer",
                fontFamily: "inherit",
                lineHeight: 1.4,
                transition: "all 0.15s"
              }}>
                <span style={{
                  display: "inline-block",
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: `1.5px solid ${showAnswer && i === q.answer ? "#22c55e" : showAnswer && i === selected ? "#ef4444" : selected === i ? "#7c3aed" : "#3d3660"}`,
                  textAlign: "center",
                  lineHeight: "22px",
                  fontSize: 12,
                  fontWeight: 700,
                  marginRight: 12,
                  background: showAnswer && i === q.answer ? "#22c55e22" : "transparent",
                  color: showAnswer && i === q.answer ? "#22c55e" : showAnswer && i === selected ? "#ef4444" : "#8b7fb8",
                  verticalAlign: "middle"
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showAnswer && (
          <div style={{
            padding: "16px 18px",
            borderRadius: 10,
            background: isCorrect ? "#0a2e1a" : "#2e1a0a",
            border: `1px solid ${isCorrect ? "#22c55e33" : "#f5930033"}`,
            marginBottom: 24,
            animation: "fadeIn 0.3s ease"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img
                  src={isCorrect ? MARVIN_RIGHT : MARVIN_WRONG}
                  alt={isCorrect ? "Happy Marvin" : "Sad Marvin"}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    objectFit: "cover",
                    border: `2px solid ${isCorrect ? "#22c55e55" : "#f5930055"}`
                  }}
                />
                {isCorrect && (
                  <div style={{
                    position: "absolute",
                    bottom: -6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #22c55e, #4ade80)",
                    color: "#0a2e1a",
                    fontSize: 10,
                    fontWeight: 800,
                    padding: "2px 8px",
                    borderRadius: 6,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap"
                  }}>
                    Hooray!
                  </div>
                )}
              </div>
              <div>
                <div style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: isCorrect ? "#4ade80" : "#fb923c",
                  marginBottom: 4,
                  letterSpacing: 1,
                  textTransform: "uppercase"
                }}>
                  {isCorrect ? "Correct!" : "Not quite..."}
                </div>
              </div>
            </div>
            <p style={{
              fontSize: 14,
              lineHeight: 1.6,
              margin: 0,
              color: "#d1cbe3"
            }}>
              {q.explanation}
            </p>
          </div>
        )}

        {/* Action Button */}
        {!showAnswer ? (
          <button onClick={checkAnswer} disabled={selected === null} style={{
            width: "100%",
            padding: "15px",
            borderRadius: 10,
            border: "none",
            background: selected === null ? "#2d2640" : "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: selected === null ? "#5a4f7a" : "#fff",
            fontSize: 15,
            fontWeight: 700,
            cursor: selected === null ? "not-allowed" : "pointer",
            fontFamily: "inherit"
          }}>
            Check Answer
          </button>
        ) : (
          <button onClick={nextQuestion} style={{
            width: "100%",
            padding: "15px",
            borderRadius: 10,
            border: "none",
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit"
          }}>
            {currentIdx < quizQuestions.length - 1 ? "Next Question →" : "See Results"}
          </button>
        )}

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  // RESULTS
  if (screen === "results") {
    const pct = Math.round((score / results.length) * 100);
    const grade = pct >= 90 ? "A" : pct >= 80 ? "B" : pct >= 70 ? "C" : pct >= 60 ? "D" : "F";
    const gradeColor = pct >= 80 ? "#4ade80" : pct >= 60 ? "#fbbf24" : "#ef4444";

    return (
      <div style={{
        fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
        maxWidth: 640,
        margin: "0 auto",
        padding: "32px 20px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1a1625 0%, #0f0d15 100%)",
        color: "#e8e4ef"
      }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: `4px solid ${gradeColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            background: `${gradeColor}11`
          }}>
            <span style={{ fontSize: 40, fontWeight: 800, color: gradeColor }}>{grade}</span>
          </div>
          <h2 style={{ fontSize: 24, margin: "0 0 4px" }}>
            {score} / {results.length}
          </h2>
          <p style={{ color: "#8b7fb8", fontSize: 14, margin: 0 }}>{pct}% correct</p>
        </div>

        {/* Category breakdown */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 14, color: "#a99dd4", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
            By Topic
          </h3>
          {[...new Set(results.map(r => r.category))].map(cat => {
            const catResults = results.filter(r => r.category === cat);
            const catCorrect = catResults.filter(r => r.correct).length;
            const catPct = Math.round((catCorrect / catResults.length) * 100);
            return (
              <div key={cat} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #2d264044"
              }}>
                <span style={{ fontSize: 14, color: "#d1cbe3" }}>{cat}</span>
                <span style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: catPct >= 80 ? "#4ade80" : catPct >= 60 ? "#fbbf24" : "#ef4444"
                }}>
                  {catCorrect}/{catResults.length}
                </span>
              </div>
            );
          })}
        </div>

        {/* Missed questions */}
        {missed.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 14, color: "#a99dd4", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
              Missed Questions
            </h3>
            {missed.map((m, i) => (
              <div key={i} style={{
                padding: "14px 16px",
                borderRadius: 10,
                background: "#1e1a2e",
                border: "1px solid #2d2640",
                marginBottom: 10
              }}>
                <p style={{ fontSize: 14, margin: "0 0 8px", color: "#d1cbe3", lineHeight: 1.4 }}>{m.question}</p>
                <p style={{ fontSize: 13, margin: 0, color: "#4ade80" }}>
                  ✓ {m.type === "true_false" ? (m.answer === 0 ? "True" : "False") : m.options[m.answer]}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {missed.length > 0 && (
            <button onClick={() => startQuiz(selectedCats, true, shuffle(missed))} style={{
              width: "100%",
              padding: "15px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit"
            }}>
              Retry Missed ({missed.length})
            </button>
          )}
          <button onClick={() => startQuiz(selectedCats)} style={{
            width: "100%",
            padding: "15px",
            borderRadius: 10,
            border: `1.5px solid #7c3aed`,
            background: "transparent",
            color: "#c4b5fd",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit"
          }}>
            New Quiz
          </button>
          <button onClick={() => setScreen("home")} style={{
            width: "100%",
            padding: "15px",
            borderRadius: 10,
            border: "1.5px solid #2d2640",
            background: "transparent",
            color: "#8b7fb8",
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "inherit"
          }}>
            Back to Topics
          </button>
        </div>
      </div>
    );
  }

  return null;
}
