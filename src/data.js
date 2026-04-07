export const ARCHETYPES = {
  incumbent_fi: { label:"Incumbent FI", desc:"Issuer / acquirer with scale, legacy stack, deposit franchise" },
  challenger:   { label:"Challenger / Fintech", desc:"Cloud-native, narrow product, growth over margin" },
  acquiring:    { label:"Acquiring value chain", desc:"Acquirer / PSP / ISO / ISV / orchestration" },
  network:      { label:"Network / wallet", desc:"Schemes, mobile wallets, BNPL networks" },
  merchant:     { label:"Merchant", desc:"Sells the goods, pays the cost of acceptance" },
  regulator:    { label:"Regulator / policy", desc:"Sets rules, mandates transparency, balances welfare" },
  investor:     { label:"Investor / advisor", desc:"VC, PE, consultant, operator-investor" },
};

export const ROLES = [
  { id:"large_fi",   label:"Large FI / Tier-1 bank",        arch:"incumbent_fi" },
  { id:"mid_fi",     label:"Mid-size / regional bank",      arch:"incumbent_fi" },
  { id:"mutual",     label:"Mutual / customer-owned bank",  arch:"incumbent_fi" },
  { id:"neobank",    label:"Challenger / neobank",          arch:"challenger" },
  { id:"fintech",    label:"Fintech (non-bank)",            arch:"challenger" },
  { id:"bnpl",       label:"BNPL provider",                 arch:"network" },
  { id:"acquirer",   label:"Acquirer",                      arch:"acquiring" },
  { id:"psp",        label:"PSP / gateway",                 arch:"acquiring" },
  { id:"iso_isv",    label:"ISO / ISV / orchestrator",      arch:"acquiring" },
  { id:"scheme",     label:"Card scheme (Visa/MC/eftpos)",  arch:"network" },
  { id:"wallet",     label:"Mobile wallet (Apple/Google)",  arch:"network" },
  { id:"merch_lg",   label:"Merchant, large retail",       arch:"merchant" },
  { id:"merch_smb",  label:"Merchant, SMB",                arch:"merchant" },
  { id:"rba",        label:"Regulator (RBA / ACCC / Treasury)", arch:"regulator" },
  { id:"advocate",   label:"Public policy / consumer advocate",  arch:"regulator" },
  { id:"vc",         label:"Venture capital",               arch:"investor" },
  { id:"pe",         label:"Private equity",                arch:"investor" },
  { id:"consultant", label:"Strategy consultant",           arch:"investor" },
  { id:"operator",   label:"Payments operator / professional", arch:"investor" },
  { id:"academic",   label:"Academic / researcher",         arch:"investor" },
];

export const KPIS = [
  { id:"revenue",     label:"Revenue / margin" },
  { id:"cost",        label:"Cost base" },
  { id:"share",       label:"Market share" },
  { id:"risk",        label:"Risk / fraud exposure" },
  { id:"innovation",  label:"Innovation velocity" },
  { id:"welfare",     label:"Consumer welfare" },
  { id:"reg",         label:"Regulatory pressure" },
  { id:"option",      label:"Strategic optionality" },
];

export const ROLE_KPI = {
  incumbent_fi: { revenue:[1.0,+1], cost:[0.9,-1], share:[0.9,+1], risk:[0.8,-1], innovation:[0.5,+1], welfare:[0.3,+1], reg:[0.7,-1], option:[0.6,+1] },
  challenger:   { revenue:[0.7,+1], cost:[0.6,-1], share:[1.0,+1], risk:[0.6,-1], innovation:[1.0,+1], welfare:[0.5,+1], reg:[0.5,-1], option:[0.9,+1] },
  acquiring:    { revenue:[1.0,+1], cost:[0.8,-1], share:[0.9,+1], risk:[0.6,-1], innovation:[0.7,+1], welfare:[0.3,+1], reg:[0.6,-1], option:[0.7,+1] },
  network:      { revenue:[1.0,+1], cost:[0.5,-1], share:[1.0,+1], risk:[0.6,-1], innovation:[0.7,+1], welfare:[0.3,+1], reg:[0.9,-1], option:[0.8,+1] },
  merchant:     { revenue:[0.6,+1], cost:[1.0,-1], share:[0.4,+1], risk:[0.5,-1], innovation:[0.4,+1], welfare:[0.6,+1], reg:[0.3,+1], option:[0.5,+1] },
  regulator:    { revenue:[0.2,-1], cost:[0.6,-1], share:[0.4,-1], risk:[0.9,-1], innovation:[0.6,+1], welfare:[1.0,+1], reg:[0.3,+1], option:[0.5,+1] },
  investor:     { revenue:[0.9,+1], cost:[0.6,-1], share:[0.9,+1], risk:[0.6,-1], innovation:[0.9,+1], welfare:[0.4,+1], reg:[0.5,-1], option:[1.0,+1] },
};

export const RAMP = { short:0.35, med:0.75, long:1.0 };

export const TOPICS = [
{
  id:"agentic",
  title:"Agentic Commerce Infrastructure",
  tagline:"Machines that buy, authenticate, and settle without humans in the loop",
  hero:"The credential layer is the bottleneck. Whoever owns it owns agentic commerce.",
  briefing:{
    incumbent_fi:{
      opportunity:"Become the trusted credential issuer for AI agents, extending card-on-file and tokenisation into machine-to-machine commerce.",
      problem:"Legacy auth stacks (3DS, SMS OTP) are not built for non-human actors. If agents settle through fintech rails, the issuer disappears from the transaction.",
      context:"Visa's CTF/VIC/TAP/MPP and Mastercard Agent Pay are already live. Stripe + Tempo deployed MPP in 2025. The question is whether your tokens are agent-ready or whether a fintech intermediates you."
    },
    challenger:{
      opportunity:"Be the agent-native wallet. Skip the legacy auth debt and issue cryptographic credentials designed for AI from day one.",
      problem:"You don't issue scheme credentials and can't easily piggyback on bank-grade KYC for autonomous spend.",
      context:"The race is to be the default 'agent identity' provider. Whoever wins becomes the new card-on-file."
    },
    acquiring:{
      opportunity:"Build the merchant-side rails for agent traffic, orchestration that knows how to route, authenticate, and dispute machine purchases.",
      problem:"Today's risk models assume human intent. Agent traffic looks like fraud to most acquirers.",
      context:"Stripe is already shipping. If you don't have an MPP-equivalent within 18 months you become a commodity gateway."
    },
    network:{
      opportunity:"Re-monetise the rails. Agent transactions create new fee surfaces (credentialing, attestation, dispute mediation) that bypass traditional interchange caps.",
      problem:"If agents standardise on open protocols (MPP, A2A pay), the schemes' rent on the credential layer compresses.",
      context:"This is the biggest scheme repositioning since EMV. The CTF/VIC stack is the bet."
    },
    merchant:{
      opportunity:"Lower CAC. Agents pre-qualify intent, fewer abandoned carts, less paid acquisition leakage.",
      problem:"Refunds, disputes, and consent provenance are unsolved when no human clicks 'buy'.",
      context:"You will be asked to accept agent traffic before the consumer-protection rules catch up."
    },
    regulator:{
      opportunity:"Set the consent and provenance standard before private rails lock in. This is a once-a-decade architectural choice.",
      problem:"No statutory definition of 'authorisation' when an agent acts on a consumer's behalf. Liability is unclear.",
      context:"PSRA reforms (Dec 2025) give the RBA the remit. Mid-2026 consultation should explicitly cover agentic commerce."
    },
    investor:{
      opportunity:"The credential / attestation layer is the most defensible position in agentic commerce. A handful of category winners will emerge.",
      problem:"Hard to underwrite, incumbents have distribution, challengers have product, neither has both.",
      context:"Watch CTF/VIC/MPP adoption curves and the first major agent-driven dispute case."
    }
  },
  variables:[
    { id:"token_ready", name:"% of issuer credentials agent-ready (MPP/CTF compatible)", unit:"%", anchor:"~5% globally today (industry est., 2025)", source:"Visa CTF, Mastercard Agent Pay launch materials", min:0, max:100, default:10, weight:0.95,
      effects:{ revenue:+0.7, share:+0.8, option:+0.9, reg:-0.2, innovation:+0.6 } },
    { id:"agent_share", name:"Share of ecommerce GMV initiated by agents", unit:"%", anchor:"<1% today; analyst est. 15-30% by 2030", source:"BCG / Gartner 2025 agentic commerce notes", min:0, max:60, default:1, weight:0.9,
      effects:{ share:+0.9, revenue:+0.5, risk:+0.6, welfare:+0.3, reg:+0.7 } },
    { id:"dispute_clarity", name:"Legal clarity on agent-authorised disputes", unit:"index 0-100", anchor:"~15 today (no statutory definition)", source:"PSRA 2025 amendments; AG dept analysis", min:0, max:100, default:15, weight:0.7,
      effects:{ risk:-0.7, welfare:+0.6, reg:-0.4, option:+0.4 } },
    { id:"fintech_intermediation", name:"Fintech share of agent settlement flow", unit:"%", anchor:"~70% of pilots route via Stripe/Tempo (2025)", source:"Stripe + Tempo MPP launch", min:0, max:100, default:70, weight:0.75,
      effects:{ revenue:-0.6, share:-0.7, innovation:+0.4, option:-0.5 } },
    { id:"ai_capex", name:"Issuer/acquirer applied-AI capex intensity", unit:"% of opex", anchor:"2 to 4% today (top-quartile FIs)", source:"Celent 2025; bank disclosures", min:0, max:15, default:3, weight:0.6,
      effects:{ cost:+0.4, innovation:+0.8, option:+0.6, share:+0.3 } }
  ]
},
{
  id:"payto",
  title:"NPP / PayTo as a Card Rail Competitor",
  tagline:"Real-time, mandate-based, API-native, and structurally cheaper than cards",
  hero:"PayTo has the bones to disintermediate card rails. The unsolved question is checkout UX.",
  briefing:{
    incumbent_fi:{
      opportunity:"Lead the rail you already own. PayTo lets issuers reclaim direct debit and recurring revenue from card schemes, without paying interchange to yourself.",
      problem:"PayTo cannibalises your own card economics. Internal P&L wars stall the build-out.",
      context:"ISO 20022 deadlines force connectivity; 90%+ of NPP-reachable accounts are PayTo-capable on paper. Real adoption is far lower."
    },
    challenger:{
      opportunity:"PayTo gives challengers an interchange-free recurring billing rail. Subscription products can undercut cards on cost.",
      problem:"You don't control the UX inside the issuer banking app, friction kills mandate setup.",
      context:"The CDR + PayTo combination is the structural threat to scheme recurring volumes."
    },
    acquiring:{
      opportunity:"Add PayTo as a tender type and capture savings as new merchant value. Differentiation versus pure card acquirers.",
      problem:"PayTo doesn't generate scheme-style interchange to share with you. Margin compresses.",
      context:"Whoever solves PayTo orchestration for merchants first owns subscription verticals."
    },
    network:{
      opportunity:"Limited. Schemes can defend with 'PayTo-on-card' style products (e.g., Visa Direct).",
      problem:"Recurring is one of the most profitable card use cases. Direct loss of high-margin volume.",
      context:"EU SEPA Instant + Open Banking already eroded card recurring share, Australia is on the same trajectory."
    },
    merchant:{
      opportunity:"Recurring acceptance cost can fall from ~1.5% (card) to <0.3% (PayTo). At scale, that's a P&L line item.",
      problem:"Mandate setup UX still loses ~30-50% vs tap-to-pay enrolment.",
      context:"Subscription-heavy merchants (telco, utilities, SaaS, gym, insurance) have the strongest case."
    },
    regulator:{
      opportunity:"PayTo adoption is the clearest lever to reduce systemic merchant cost of acceptance.",
      problem:"Bank-by-bank PayTo readiness is uneven. Without nudges, the rail underdelivers.",
      context:"RBA can mandate PayTo capability standards via PSRA remit and ISO 20022 timelines."
    },
    investor:{
      opportunity:"Picks-and-shovels: PayTo orchestration, mandate UX, reconciliation. Underbuilt category.",
      problem:"Volume curves are still slow. Patient capital required.",
      context:"Watch PayTo agreement counts in NPPA quarterly disclosures."
    }
  },
  variables:[
    { id:"payto_reach", name:"% of NPP-reachable accounts PayTo-enabled", unit:"%", anchor:"~70% by mid-2025 (NPPA disclosures)", source:"NPP Australia 2025 quarterly", min:0, max:100, default:70, weight:0.85,
      effects:{ share:+0.7, cost:+0.5, innovation:+0.6, option:+0.6 } },
    { id:"checkout_share", name:"PayTo share of online checkout", unit:"%", anchor:"<2% today", source:"Industry estimate 2025", min:0, max:40, default:2, weight:1.0,
      effects:{ share:+0.95, revenue:+0.6, cost:+0.7, option:+0.7, reg:+0.4 } },
    { id:"recurring_shift", name:"PayTo share of recurring/subscription payments", unit:"%", anchor:"<5% today", source:"Industry estimate; SEPA Instant comparator", min:0, max:80, default:5, weight:0.95,
      effects:{ share:+0.8, revenue:+0.5, cost:+0.6, innovation:+0.4 } },
    { id:"mandate_friction", name:"Mandate setup completion rate", unit:"%", anchor:"~55% (vs 85% tap)", source:"Industry UX benchmark", min:30, max:95, default:55, weight:0.7,
      effects:{ share:+0.6, welfare:+0.4, innovation:+0.3 } },
    { id:"merch_savings", name:"Acceptance cost saved vs card", unit:"bps", anchor:"~120bps (1.5% → 0.3%)", source:"RBA cost of acceptance studies 2024-25", min:0, max:200, default:120, weight:0.75,
      effects:{ cost:+0.9, welfare:+0.5, revenue:-0.4 } }
  ]
},
{
  id:"wallets",
  title:"Mobile Wallet Market Power & NFC Access",
  tagline:"Two foreign tech firms run the in-person card rail, and the RBA knows it",
  hero:"40%+ of in-person card transactions now ride Apple Pay or Google Pay. The next review is mid-2026.",
  briefing:{
    incumbent_fi:{
      opportunity:"If NFC opens, issuers can ship their own wallets and reclaim the customer relationship at the point of sale.",
      problem:"Wallet fees to issuers are opaque and rising. Apple/Google sit between you and your customer.",
      context:"RBA's 2025/26 review explicitly puts mobile wallets in scope. PSRA gives it teeth."
    },
    challenger:{
      opportunity:"Open NFC access lets challengers ship a true tap experience without scheme dependency.",
      problem:"Today the wallet duopoly is the choke point, challengers must ride Apple/Google or have no in-person presence.",
      context:"EU DMA forced Apple to open NFC. Australia is watching closely."
    },
    acquiring:{
      opportunity:"Wallet diversity = more SDKs to integrate, more value to add. Orchestration premium.",
      problem:"Today there's nothing to orchestrate at the wallet layer.",
      context:"DMA-style remedies in Australia would create immediate work for acquirers."
    },
    network:{
      opportunity:"Schemes benefit from any tap volume, wallet or card-native, as long as NFC access is neutral.",
      problem:"Wallets capture the customer relationship and compress scheme branding.",
      context:"Schemes have quietly lobbied for NFC openness for years."
    },
    merchant:{
      opportunity:"Wallet competition could lower acceptance cost and unlock loyalty integration.",
      problem:"Today wallets impose a uniform UX merchants can't customise.",
      context:"Large retailers want their own apps to tap-to-pay; SMBs want lower fees."
    },
    regulator:{
      opportunity:"Single biggest competition lever in domestic payments. PSRA + mid-2026 review = a clear runway.",
      problem:"Politically sensitive, Apple and Google are not domestic actors.",
      context:"EU DMA precedent makes the policy template ready-to-copy."
    },
    investor:{
      opportunity:"Wallet-adjacent infrastructure (HCE, secure element brokering, in-app pay SDKs) becomes investable if NFC opens.",
      problem:"Binary regulatory outcome, long-dated optionality.",
      context:"Track the RBA mid-2026 consultation outputs."
    }
  },
  variables:[
    { id:"wallet_share", name:"Mobile wallet share of in-person card txns", unit:"%", anchor:"~44% (RBA 2025)", source:"RBA Bulletin / Payments Data 2025", min:10, max:90, default:44, weight:0.95,
      effects:{ share:-0.6, revenue:-0.4, cost:+0.3, reg:+0.8, welfare:+0.2 } },
    { id:"nfc_open", name:"NFC openness to third parties", unit:"index 0-100", anchor:"~10 (closed); EU DMA = 80", source:"EU DMA outcomes 2024-25", min:0, max:100, default:10, weight:0.9,
      effects:{ innovation:+0.9, share:+0.7, option:+0.8, reg:-0.5 } },
    { id:"wallet_fee", name:"Wallet fee to issuers", unit:"bps", anchor:"~15bps (estimates; opaque)", source:"Industry estimates; Reuters 2024", min:0, max:50, default:15, weight:0.7,
      effects:{ cost:+0.7, revenue:-0.5, reg:+0.4 } },
    { id:"issuer_wallet_share", name:"Issuer-branded wallet adoption", unit:"%", anchor:"~3%", source:"Industry estimate", min:0, max:50, default:3, weight:0.6,
      effects:{ share:+0.6, revenue:+0.4, innovation:+0.5 } },
    { id:"reg_action", name:"RBA NFC openness intervention strength", unit:"index 0-100", anchor:"~20 (review pending)", source:"PSRA 2025; RBA consultation", min:0, max:100, default:20, weight:0.85,
      effects:{ reg:+0.9, innovation:+0.7, welfare:+0.6, share:+0.5 } }
  ]
},
{
  id:"psra",
  title:"Expanded PSRA Regulatory Remit",
  tagline:"For the first time in 25 years, the RBA can regulate the whole stack",
  hero:"Mobile wallets, BNPL, three-party schemes, ecommerce platforms, all in scope from December 2025.",
  briefing:{
    incumbent_fi:{
      opportunity:"Levels the playing field. Players who out-competed by sitting outside the perimeter (BNPL, wallets) now face the same rules you do.",
      problem:"More compliance lift, more disclosure, more cost-to-serve.",
      context:"PSRA modernisation passed December 2025; mid-2026 priorities consultation defines the runway."
    },
    challenger:{
      opportunity:"Regulatory clarity unlocks institutional capital and enterprise sales.",
      problem:"You're now in scope. Build a compliance function before it builds itself around you.",
      context:"Any new payments product launching now should be designed to PSRA standards."
    },
    acquiring:{
      opportunity:"Designation of new players means new compliance services to sell.",
      problem:"Acquirers themselves face tighter conduct expectations.",
      context:"The mid-2026 consultation will name designation priorities."
    },
    network:{
      opportunity:"Three-party schemes (Amex, Diners) move into the same conversation as four-party, could unlock new product structures.",
      problem:"Designation means transparency and pricing constraints you previously avoided.",
      context:"This is the largest perimeter expansion since the original PSRA."
    },
    merchant:{
      opportunity:"More transparency and the ability to surcharge BNPL would lower cost of acceptance.",
      problem:"Compliance pass-through from PSPs.",
      context:"Merchants are the political constituency the RBA cites most often."
    },
    regulator:{
      opportunity:"You finally have the toolkit. The mid-2026 priorities define the next decade.",
      problem:"Capacity. The remit is broad and the team is finite.",
      context:"PSRA + mid-2026 consultation is the central planning event for Australian payments."
    },
    investor:{
      opportunity:"De-risks the sector for institutional capital.",
      problem:"Specific designations can crater specific business models overnight.",
      context:"Map every portfolio company to the PSRA designation matrix."
    }
  },
  variables:[
    { id:"designations", name:"# of new designation orders by 2027", unit:"count", anchor:"0 today; 3-6 expected", source:"PSRA 2025; RBA consultation paper", min:0, max:15, default:3, weight:0.95,
      effects:{ reg:+0.95, welfare:+0.5, cost:+0.7, option:-0.3 } },
    { id:"transparency_strength", name:"Strength of mandated transparency rules", unit:"index 0-100", anchor:"~40 (interchange disclosure live; scheme fees from Oct 2026)", source:"RBA review final report 2025", min:0, max:100, default:40, weight:0.85,
      effects:{ welfare:+0.8, cost:+0.4, revenue:-0.3, reg:+0.5 } },
    { id:"bnpl_in_perimeter", name:"BNPL fully inside the regulatory perimeter", unit:"index 0-100", anchor:"~70 (credit licensing live June 2025)", source:"Treasury BNPL legislation 2024-25", min:0, max:100, default:70, weight:0.7,
      effects:{ welfare:+0.6, share:-0.2, reg:+0.5, risk:-0.4 } },
    { id:"consultation_intensity", name:"Mid-2026 consultation intensity", unit:"index 0-100", anchor:"~50 (planned)", source:"RBA work program", min:0, max:100, default:50, weight:0.6,
      effects:{ option:+0.5, reg:+0.6, innovation:+0.3 } },
    { id:"compliance_lift", name:"Compliance cost lift industry-wide", unit:"% opex", anchor:"~3-5% est.", source:"Industry est.; ASIC reports", min:0, max:15, default:4, weight:0.6,
      effects:{ cost:+0.9, share:-0.2, innovation:-0.3 } }
  ]
},
{
  id:"waterbed",
  title:"Scheme Fee Transparency & the Waterbed Effect",
  tagline:"Cap interchange, watch scheme fees rise to fill the gap",
  hero:"The EU proved it: post-IFR, average MSCs nearly doubled. Australia is mid-cycle.",
  briefing:{
    incumbent_fi:{
      opportunity:"As issuer interchange compresses, scheme rebates and incentive economics become more important. Negotiate harder.",
      problem:"Net issuer revenue from cards is structurally falling.",
      context:"From October 2026, networks publish quarterly scheme fee data. The waterbed becomes visible."
    },
    challenger:{
      opportunity:"Lower interchange + lower scheme fee transparency = a window to undercut incumbents on issued-card economics.",
      problem:"You're a price-taker on scheme fees and don't have rebate scale.",
      context:"Transparency without caps mainly helps the largest players."
    },
    acquiring:{
      opportunity:"Acquirers can demonstrate the waterbed effect to merchants and use it to upsell unbundled pricing.",
      problem:"You absorb the variability and explain it.",
      context:"IF+ (interchange-plus) pricing becomes the only defensible structure."
    },
    network:{
      opportunity:"Scheme fee revenue is the structural growth line, caps are not (yet) on the table.",
      problem:"Transparency invites future caps. Use the runway wisely.",
      context:"EU experience: caps came after transparency."
    },
    merchant:{
      opportunity:"Visibility into the true cost of acceptance, strongest negotiation position in 20 years.",
      problem:"Net cost may not fall. Transparency ≠ relief.",
      context:"Subscription-heavy and high-volume merchants benefit most."
    },
    regulator:{
      opportunity:"Quarterly data lets you act on facts, not anecdotes. Scheme fee caps remain in the toolkit.",
      problem:"Transparency alone may not constrain behaviour. The EU experience is sobering.",
      context:"Mid-2026 review will be the first test."
    },
    investor:{
      opportunity:"Rate-of-change of scheme fees becomes a tradable signal. Acquirer margins re-rate either way.",
      problem:"Hard to call timing of regulatory action.",
      context:"Watch the October 2026 disclosures closely."
    }
  },
  variables:[
    { id:"interchange_cap", name:"Average effective interchange (debit+credit blended)", unit:"bps", anchor:"~50bps (RBA review 2024-25)", source:"RBA review final report", min:20, max:120, default:50, weight:0.9,
      effects:{ revenue:+0.8, cost:-0.5, share:+0.3 } },
    { id:"scheme_fee_growth", name:"Scheme fee growth p.a.", unit:"%", anchor:"~10-15%/yr (industry est.)", source:"AusPayNet, RBA submissions", min:0, max:30, default:12, weight:0.95,
      effects:{ cost:+0.9, revenue:+0.7, welfare:-0.6, reg:+0.7 } },
    { id:"transparency", name:"Quarterly scheme fee disclosure quality", unit:"index 0-100", anchor:"0 today; 60 from Oct 2026", source:"RBA mandate", min:0, max:100, default:60, weight:0.7,
      effects:{ welfare:+0.7, reg:+0.5, option:+0.4 } },
    { id:"if_plus_share", name:"Share of merchants on IF+ pricing", unit:"%", anchor:"~25% today (RBA cost of acceptance)", source:"RBA 2024-25", min:0, max:100, default:25, weight:0.6,
      effects:{ welfare:+0.5, cost:-0.4, innovation:+0.3 } },
    { id:"future_cap", name:"Probability of scheme fee cap by 2028", unit:"%", anchor:"~25% (analyst est.)", source:"Industry submissions", min:0, max:100, default:25, weight:0.7,
      effects:{ revenue:-0.7, reg:+0.8, welfare:+0.6 } }
  ]
},
{
  id:"xborder",
  title:"Cross-Border Payment Cost & Speed",
  tagline:"BIS Project Mandala, Apr-2027 foreign-issued caps, virtual card loophole closing",
  hero:"Cross-border is the most expensive flow in the system. The reform stack is the deepest in 20 years.",
  briefing:{
    incumbent_fi:{
      opportunity:"FX margins remain a hidden profit pool, defend with transparency, win with UX.",
      problem:"Wise / Revolut already set consumer expectations. Compression is structural.",
      context:"BIS Project Mandala, ISO 20022 cross-border, foreign-issued interchange caps from April 2027."
    },
    challenger:{
      opportunity:"Cross-border is the easiest place to demonstrate cost transparency advantage.",
      problem:"FX licensing and partner banking complexity at scale.",
      context:"This is where Wise built a $10B+ business."
    },
    acquiring:{
      opportunity:"Foreign-issued txn caps + virtual card closure means new acquirer logic for travel/marketplace verticals.",
      problem:"Margin from foreign card surcharges disappears.",
      context:"April 2027 is a hard date."
    },
    network:{
      opportunity:"International scheme fees remain the highest-margin product. Defend it.",
      problem:"Mandala-style CBDC bridges threaten the rail.",
      context:"BIS pilots are technically real but commercially early."
    },
    merchant:{
      opportunity:"Lower cross-border interchange = direct savings for travel, hospitality, ecommerce exporters.",
      problem:"FX volatility risk shifts to you.",
      context:"April 2027 caps + closing the virtual-card loophole."
    },
    regulator:{
      opportunity:"Aligns Australia with G20 cross-border roadmap. Wins on cost, speed, transparency, access.",
      problem:"Coordination across jurisdictions is hard.",
      context:"RBA cited cross-border as a 2025-26 priority."
    },
    investor:{
      opportunity:"Cross-border infra (Mandala-adjacent, B2B FX) is one of the few categories with scale exits left.",
      problem:"Regulatory dependency and FX risk.",
      context:"Watch BIS Mandala pilot outputs and the April 2027 trigger."
    }
  },
  variables:[
    { id:"foreign_cap", name:"Foreign-issued card interchange cap (effective)", unit:"bps", anchor:"~190bps today; capped Apr 2027", source:"RBA review 2025", min:50, max:250, default:190, weight:0.9,
      effects:{ cost:-0.8, revenue:-0.7, welfare:+0.7, reg:+0.6 } },
    { id:"virtual_card_loophole", name:"Virtual-card circumvention closed", unit:"index 0-100", anchor:"~30 today; 90 post-2027", source:"RBA review final report", min:0, max:100, default:30, weight:0.7,
      effects:{ cost:-0.5, welfare:+0.5, reg:+0.4 } },
    { id:"mandala", name:"BIS Project Mandala adoption", unit:"index 0-100", anchor:"~10 (pilot)", source:"BIS 2024-25", min:0, max:100, default:10, weight:0.6,
      effects:{ innovation:+0.8, cost:-0.6, option:+0.7 } },
    { id:"fx_margin", name:"Average consumer FX margin", unit:"%", anchor:"~3.5% banks; ~0.5% Wise", source:"ACCC FX inquiry; provider disclosures", min:0.2, max:6, default:3.5, weight:0.75,
      effects:{ revenue:+0.7, welfare:-0.7, share:-0.4 } },
    { id:"speed", name:"Average cross-border settlement time", unit:"hours", anchor:"~24-48h SWIFT; <10s Mandala pilots", source:"BIS / SWIFT data", min:0.1, max:96, default:36, weight:0.5,
      effects:{ welfare:+0.5, innovation:+0.4 } }
  ]
},
{
  id:"tokenisation",
  title:"Tokenisation as Competitive Infrastructure",
  tagline:"Australia is among the most tokenised markets globally, but the new IC structure doesn't reward it",
  hero:"Network tokens lift ecom approval rates 2 to 4%. The new interchange table doesn't pay you for it.",
  briefing:{
    incumbent_fi:{
      opportunity:"Use tokenisation to defend authorisation rate (and therefore wallet share-of-checkout).",
      problem:"Capex without an interchange reward, the business case is harder than 2 years ago.",
      context:"RBA review 2024-25 declined to differentiate IC on token status."
    },
    challenger:{
      opportunity:"Token-native onboarding is a structural advantage versus legacy issuers.",
      problem:"You depend on scheme tokens, not your own infrastructure.",
      context:"Token vaulting and lifecycle management is now table stakes."
    },
    acquiring:{
      opportunity:"Approval-rate uplift is the most defensible value-add for high-AOV ecom merchants.",
      problem:"Hard to monetise, easily commoditised.",
      context:"Stripe / Adyen / Braintree market this aggressively."
    },
    network:{
      opportunity:"Token vaulting is a long-term scheme moat. Push token issuance volume.",
      problem:"Without IC differential, issuers underinvest.",
      context:"Schemes' interest is misaligned with the new RBA IC structure."
    },
    merchant:{
      opportunity:"2 to 4% auth-rate uplift is direct revenue. Pure upside.",
      problem:"Vendor lock-in to whoever provides your tokenisation layer.",
      context:"Network tokens > merchant-stored PANs in every dimension that matters."
    },
    regulator:{
      opportunity:"Tokenisation reduces fraud and improves consumer protection.",
      problem:"Differential IC is politically tricky.",
      context:"Mid-2026 review may revisit."
    },
    investor:{
      opportunity:"Token lifecycle management is an underbuilt B2B category in Australia.",
      problem:"Schemes are the natural owners.",
      context:"Watch ecom approval rate disclosures."
    }
  },
  variables:[
    { id:"token_penetration", name:"Network token penetration of ecom", unit:"%", anchor:"~60% Australia (top decile globally)", source:"Visa / Mastercard 2024 disclosures", min:0, max:100, default:60, weight:0.85,
      effects:{ risk:-0.7, revenue:+0.6, welfare:+0.5, innovation:+0.5 } },
    { id:"auth_uplift", name:"Approval rate uplift from tokenisation", unit:"%", anchor:"~3% (industry studies)", source:"Visa, Mastercard, Adyen 2023-24", min:0, max:8, default:3, weight:0.8,
      effects:{ revenue:+0.8, share:+0.4, welfare:+0.3 } },
    { id:"ic_differential", name:"Interchange reward for tokenised txns", unit:"bps", anchor:"0 today", source:"RBA review 2025", min:0, max:30, default:0, weight:0.65,
      effects:{ revenue:+0.6, innovation:+0.5, option:+0.4 } },
    { id:"merchant_pan_storage", name:"Merchants still storing raw PANs", unit:"%", anchor:"~25%", source:"PCI council; industry est.", min:0, max:80, default:25, weight:0.6,
      effects:{ risk:+0.8, welfare:-0.5, reg:+0.4 } },
    { id:"vault_cost", name:"Per-token vaulting cost", unit:"cents", anchor:"~0.5c", source:"Vendor rate cards", min:0.05, max:5, default:0.5, weight:0.4,
      effects:{ cost:+0.5, share:-0.2 } }
  ]
},
{
  id:"bnpl",
  title:"BNPL Regulation & the Surcharge Question",
  tagline:"Credit-licensed since June 2025. The 2026 review may end the no-surcharge rule",
  hero:"If merchants can surcharge BNPL at a 3.5% average cost, half of BNPL users say they would switch.",
  briefing:{
    incumbent_fi:{
      opportunity:"If BNPL is surchargeable, your card products win volume back. Re-engage instalment-at-POS.",
      problem:"BNPL has captured a generation. Brand work, not just product work.",
      context:"BNPL credit licensing live; no-surcharge rules under review."
    },
    challenger:{
      opportunity:"Regulated BNPL = institutional credibility. Bank partnerships open up.",
      problem:"Compliance cost. Some weaker players exit.",
      context:"Consolidation likely."
    },
    acquiring:{
      opportunity:"Surcharge enablement is a configuration play with high merchant ROI.",
      problem:"Tender-type proliferation = engineering work.",
      context:"Stripe, Adyen, Square already offering BNPL surcharge tooling overseas."
    },
    network:{
      opportunity:"For card schemes: no-surcharge end is direct upside. For BNPL networks: existential risk to acceptance economics.",
      problem:"Asymmetric, depends which network you are.",
      context:"Mid-2026 review is the trigger date."
    },
    merchant:{
      opportunity:"Pass-through BNPL cost or stop accepting. Either way, P&L improves.",
      problem:"Customer experience risk if BNPL is core to your demographic.",
      context:"Half of BNPL users say they would switch payment method if surcharged (RBA 2024)."
    },
    regulator:{
      opportunity:"Symmetry with cards. Consumer welfare improvement.",
      problem:"BNPL lobby is loud; political risk.",
      context:"PSRA gives the RBA the mandate."
    },
    investor:{
      opportunity:"Re-rating event for BNPL stocks either way.",
      problem:"Binary regulatory outcome.",
      context:"Watch the mid-2026 RBA position paper."
    }
  },
  variables:[
    { id:"surcharge_allowed", name:"BNPL no-surcharge rule strength", unit:"index 0-100", anchor:"~80 today (still in place)", source:"RBA review 2025", min:0, max:100, default:80, weight:0.95,
      effects:{ share:+0.7, revenue:+0.6, welfare:-0.5, reg:+0.5 } },
    { id:"avg_bnpl_cost", name:"Average BNPL merchant cost", unit:"%", anchor:"~3.5% (RBA cost of acceptance)", source:"RBA 2024", min:1, max:8, default:3.5, weight:0.8,
      effects:{ cost:+0.8, share:-0.4 } },
    { id:"user_switch", name:"% BNPL users who'd switch if surcharged", unit:"%", anchor:"~50% (RBA consumer survey)", source:"RBA consumer survey 2024", min:0, max:100, default:50, weight:0.7,
      effects:{ share:-0.7, welfare:+0.4 } },
    { id:"licensing_drag", name:"Compliance cost lift on BNPL providers", unit:"% opex", anchor:"~5%", source:"ASIC; provider disclosures", min:0, max:25, default:5, weight:0.5,
      effects:{ cost:+0.7, innovation:-0.4 } },
    { id:"bnpl_volume_share", name:"BNPL share of online checkout", unit:"%", anchor:"~10% Australia", source:"AusPayNet, RBA", min:0, max:30, default:10, weight:0.7,
      effects:{ share:+0.6, revenue:+0.4, welfare:+0.2 } }
  ]
},
{
  id:"cdr",
  title:"CDR & Open Banking Payment Initiation",
  tagline:"Account-to-account payments that bypass card interchange entirely",
  hero:"If A2A pay through CDR scales, it's the structural threat to card economics.",
  briefing:{
    incumbent_fi:{
      opportunity:"Be the rail. Charge for high-quality CDR endpoints, monetise consent management.",
      problem:"You cannibalise your own card economics.",
      context:"CDR has been slow to commercialise; payment initiation is the next leg."
    },
    challenger:{
      opportunity:"CDR + PayTo is the fastest path to a banking-grade product without a banking licence.",
      problem:"Consent UX is the make-or-break.",
      context:"This is the playbook the UK and Brazil ran."
    },
    acquiring:{
      opportunity:"A2A as a tender type for high-AOV verticals (real estate, B2B, govt).",
      problem:"Lower margin per txn than cards.",
      context:"Volume play."
    },
    network:{
      opportunity:"Schemes can resist via Visa Direct / Mastercard Send-style products.",
      problem:"Direct disintermediation if A2A scales.",
      context:"UK Open Banking now processes >15M payments/month."
    },
    merchant:{
      opportunity:"Sub-30bps acceptance cost on A2A vs ~150bps card.",
      problem:"Refund and dispute UX immature.",
      context:"Verticals with thin margins benefit most."
    },
    regulator:{
      opportunity:"CDR commercialisation finally delivers on the original investment.",
      problem:"CDR has historically underdelivered. Re-set incentives.",
      context:"Treasury CDR review 2025 + RBA payment initiation work."
    },
    investor:{
      opportunity:"Open banking payment initiation infrastructure remains underbuilt locally.",
      problem:"CDR's commercial track record is poor.",
      context:"Track CDR participant counts and consent volumes."
    }
  },
  variables:[
    { id:"a2a_share", name:"A2A share of ecom checkout", unit:"%", anchor:"<1% AU; ~12% UK Open Banking", source:"OBL UK, AusPayNet", min:0, max:40, default:1, weight:0.95,
      effects:{ share:+0.9, cost:+0.8, revenue:-0.5, welfare:+0.6 } },
    { id:"consent_friction", name:"Consent flow friction", unit:"index 0-100 (high=worse)", anchor:"~70", source:"CDR consumer research 2024", min:10, max:100, default:70, weight:0.85,
      effects:{ share:-0.8, welfare:-0.5, innovation:-0.4 } },
    { id:"cdr_participants", name:"CDR active data recipients", unit:"count", anchor:"~120 (2025)", source:"ACCC CDR register", min:0, max:500, default:120, weight:0.5,
      effects:{ innovation:+0.7, share:+0.4, option:+0.5 } },
    { id:"acceptance_cost", name:"A2A merchant cost vs card", unit:"bps", anchor:"~25bps (vs ~150 card)", source:"Industry comparators", min:5, max:120, default:25, weight:0.7,
      effects:{ cost:+0.8, welfare:+0.5, revenue:-0.4 } },
    { id:"refund_ux", name:"A2A refund/dispute UX maturity", unit:"index 0-100", anchor:"~30", source:"Consumer research 2024", min:0, max:100, default:30, weight:0.5,
      effects:{ welfare:+0.5, risk:-0.4, share:+0.3 } }
  ]
},
{
  id:"fraudai",
  title:"AI-Powered Fraud, Auth & Risk-Based Decisioning",
  tagline:"Australia leans into risk-based auth, and that's where AI compounds the most",
  hero:"Fraud exposure is rising. SCA-lite means model quality is the moat.",
  briefing:{
    incumbent_fi:{
      opportunity:"Applied AI on fraud is the highest-ROI AI investment a bank can make. Direct loss reduction + lower friction.",
      problem:"Model risk, explainability, and CPS 230-style operational requirements.",
      context:"Visa VAAI, Mastercard Decision Intelligence, FIDO2 / passkeys all in market."
    },
    challenger:{
      opportunity:"Cloud-native risk stacks let challengers iterate faster than incumbents.",
      problem:"You don't have the data scale incumbents enjoy.",
      context:"Federated and synthetic data approaches help close the gap."
    },
    acquiring:{
      opportunity:"Risk-as-a-service is the next acquirer differentiator after orchestration.",
      problem:"Liability shifts mean acquirers carry more model risk.",
      context:"Stripe Radar / Adyen RevenueProtect set the bar."
    },
    network:{
      opportunity:"Schemes monetise their cross-issuer data with VAAI-style products.",
      problem:"Consumer trust erosion if AI auth is opaque.",
      context:"VAAI, Decision Intelligence are major scheme bets."
    },
    merchant:{
      opportunity:"Lower false positives = direct revenue. AI delivers measurable lift.",
      problem:"Vendor proliferation; integration cost.",
      context:"Card-not-present fraud is the biggest cost line for ecom merchants."
    },
    regulator:{
      opportunity:"AI fraud tools genuinely lower system-wide harm.",
      problem:"Model bias, transparency, and consumer recourse.",
      context:"Treasury AI policy work + ASIC supervision."
    },
    investor:{
      opportunity:"Fraud AI is one of the few defensible verticals in payments. Watch TAM expansion as agentic commerce grows.",
      problem:"Hard to differentiate from incumbents at scale.",
      context:"Track scam losses and authorisation rate disclosures."
    }
  },
  variables:[
    { id:"fraud_loss", name:"CNP fraud loss rate", unit:"bps", anchor:"~70bps (AusPayNet 2024)", source:"AusPayNet 2024 fraud data", min:10, max:200, default:70, weight:0.9,
      effects:{ risk:+0.95, cost:+0.7, welfare:-0.7, reg:+0.6 } },
    { id:"passkey_adoption", name:"Passkey/FIDO2 adoption among issuers", unit:"%", anchor:"~15%", source:"FIDO Alliance / industry", min:0, max:100, default:15, weight:0.75,
      effects:{ risk:-0.7, welfare:+0.6, innovation:+0.6 } },
    { id:"ai_capex_fraud", name:"Applied-AI capex on fraud/risk", unit:"% of risk opex", anchor:"~10%", source:"Celent 2024-25", min:0, max:40, default:10, weight:0.7,
      effects:{ risk:-0.7, innovation:+0.7, cost:+0.4 } },
    { id:"false_positive", name:"Auth false positive rate", unit:"%", anchor:"~10% (industry avg)", source:"Industry benchmarks", min:1, max:25, default:10, weight:0.75,
      effects:{ revenue:-0.7, welfare:-0.5, share:-0.3 } },
    { id:"scam_losses", name:"Scam losses (Aus)", unit:"$m/yr", anchor:"~2,700 (Scamwatch 2024)", source:"ACCC Scamwatch 2024", min:500, max:5000, default:2700, weight:0.85,
      effects:{ risk:+0.9, welfare:-0.8, reg:+0.8 } }
  ]
},
];
