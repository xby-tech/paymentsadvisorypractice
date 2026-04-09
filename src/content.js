// Sidecar content: plain-English lever questions and curated topic presets.
// Kept separate from data.js so the model definitions stay readable.

// F4 — plain-English lever questions
// Keyed by topicId then leverId. Drives the human-readable line above the technical lever name.
export const LEVER_QUESTIONS = {
  agentic: {
    token_ready: 'How fast do issuers make their credentials work for AI agents?',
    agent_share: 'How much of online shopping will AI agents handle?',
    dispute_clarity: 'How clear is the law when an agent buys on a consumer\u2019s behalf?',
    fintech_intermediation: 'How much agent spend gets routed through fintechs instead of banks?',
    ai_capex: 'How aggressively do issuers and acquirers invest in applied AI?',
  },
  payto: {
    payto_reach: 'How widely is PayTo wired into Australian bank accounts?',
    checkout_share: 'How big a slice of online checkout does PayTo capture?',
    recurring_shift: 'How much subscription billing shifts from cards to PayTo?',
    mandate_friction: 'How easy is it for a customer to set up a PayTo mandate?',
    merch_savings: 'How much do merchants save per transaction vs cards?',
  },
  wallets: {
    wallet_share: 'How dominant are Apple Pay and Google Pay at the tap?',
    nfc_open: 'How open is the phone\u2019s NFC chip to non-default wallets?',
    wallet_fee: 'How much do wallets charge issuers for tap volume?',
    issuer_wallet_share: 'How much volume do bank-branded wallets win back?',
    reg_action: 'How forcefully does the RBA push wallet competition?',
  },
  psra: {
    designations: 'How many new payments players does the RBA pull under its perimeter?',
    transparency_strength: 'How tough are the new fee disclosure rules?',
    bnpl_in_perimeter: 'How fully is BNPL pulled inside the regulator\u2019s net?',
    consultation_intensity: 'How active is the RBA\u2019s mid-2026 consultation agenda?',
    compliance_lift: 'How much does compliance cost the whole industry?',
  },
  waterbed: {
    interchange_cap: 'How tight is the average cap on interchange?',
    scheme_fee_growth: 'How fast are scheme fees growing each year?',
    transparency: 'How clear are the quarterly scheme-fee disclosures?',
    if_plus_share: 'How many merchants are on transparent interchange-plus pricing?',
    future_cap: 'What\u2019s the chance of a hard scheme-fee cap by 2028?',
  },
  xborder: {
    foreign_cap: 'How tight is the cap on foreign-issued card interchange?',
    virtual_card_loophole: 'How well is the virtual-card workaround being closed?',
    mandala: 'How seriously is BIS Project Mandala being adopted?',
    fx_margin: 'What\u2019s the typical FX margin a consumer pays?',
    speed: 'How fast does a cross-border payment actually settle?',
  },
  tokenisation: {
    token_penetration: 'How tokenised is Australia\u2019s ecommerce traffic?',
    auth_uplift: 'How much does tokenisation lift approval rates?',
    ic_differential: 'Does the interchange table reward tokenised transactions?',
    merchant_pan_storage: 'How many merchants still hold raw card numbers?',
    vault_cost: 'What does it cost to vault one network token?',
  },
  bnpl: {
    surcharge_allowed: 'How firmly does the no-surcharge rule still hold?',
    avg_bnpl_cost: 'What does BNPL really cost a merchant per sale?',
    user_switch: 'How many BNPL users would walk away if surcharged?',
    licensing_drag: 'How much does the new credit licence drag on BNPL costs?',
    bnpl_volume_share: 'How big is BNPL\u2019s slice of online checkout?',
  },
  cdr: {
    a2a_share: 'How much of online checkout shifts to account-to-account pay?',
    consent_friction: 'How clunky is the CDR consent flow?',
    cdr_participants: 'How many active CDR data recipients are out there?',
    acceptance_cost: 'How cheap is A2A acceptance vs card?',
    refund_ux: 'How mature is the A2A refund and dispute experience?',
  },
  fraudai: {
    fraud_loss: 'How bad is card-not-present fraud right now?',
    passkey_adoption: 'How quickly are issuers rolling out passkeys?',
    ai_capex_fraud: 'How much of the risk budget is spent on applied AI?',
    false_positive: 'How often does auth wrongly block a real customer?',
    scam_losses: 'How big is the national scam loss bill?',
  },
};

// F3 — curated presets per topic
// Each topic gets 3 named scenarios. Click applies the slider state.
// "Status quo" presets are intentionally left as null to mean "use defaults".
export const TOPIC_PRESETS = {
  agentic: [
    { id: 'issuer_leads', label: 'Issuer leadership',
      sliders: { token_ready: 80, agent_share: 20, dispute_clarity: 60, fintech_intermediation: 30, ai_capex: 8 } },
    { id: 'status_quo', label: 'Status quo (2026)', sliders: null },
    { id: 'fintech_eats', label: 'Fintech eats the rails',
      sliders: { token_ready: 15, agent_share: 35, dispute_clarity: 20, fintech_intermediation: 90, ai_capex: 4 } },
  ],
  payto: [
    { id: 'breakthrough', label: 'PayTo breakthrough',
      sliders: { payto_reach: 95, checkout_share: 20, recurring_shift: 40, mandate_friction: 80, merch_savings: 140 } },
    { id: 'status_quo', label: 'Status quo', sliders: null },
    { id: 'stalled', label: 'Stalled adoption',
      sliders: { payto_reach: 70, checkout_share: 3, recurring_shift: 8, mandate_friction: 50, merch_savings: 120 } },
  ],
  wallets: [
    { id: 'dma', label: 'DMA-style intervention',
      sliders: { wallet_share: 44, nfc_open: 80, wallet_fee: 15, issuer_wallet_share: 20, reg_action: 85 } },
    { id: 'status_quo', label: 'Status quo', sliders: null },
    { id: 'duopoly', label: 'Duopoly entrenches',
      sliders: { wallet_share: 70, nfc_open: 10, wallet_fee: 30, issuer_wallet_share: 2, reg_action: 15 } },
  ],
  psra: [
    { id: 'hard', label: 'Regulator goes hard',
      sliders: { designations: 10, transparency_strength: 80, bnpl_in_perimeter: 95, consultation_intensity: 85, compliance_lift: 8 } },
    { id: 'status_quo', label: 'Status quo', sliders: null },
    { id: 'cautious', label: 'Cautious enforcement',
      sliders: { designations: 2, transparency_strength: 40, bnpl_in_perimeter: 60, consultation_intensity: 40, compliance_lift: 3 } },
  ],
  waterbed: [
    { id: 'eu_repeat', label: 'EU repeats here',
      sliders: { interchange_cap: 30, scheme_fee_growth: 20, transparency: 80, if_plus_share: 40, future_cap: 20 } },
    { id: 'status_quo', label: 'Status quo', sliders: null },
    { id: 'caps_land', label: 'Hard caps land',
      sliders: { interchange_cap: 30, scheme_fee_growth: 5, transparency: 90, if_plus_share: 70, future_cap: 85 } },
  ],
  xborder: [
    { id: 'mandala_momentum', label: 'Mandala momentum',
      sliders: { foreign_cap: 80, virtual_card_loophole: 95, mandala: 70, fx_margin: 1.0, speed: 2 } },
    { id: 'status_quo', label: 'Status quo', sliders: null },
    { id: 'schemes_hold', label: 'Schemes hold the line',
      sliders: { foreign_cap: 180, virtual_card_loophole: 35, mandala: 10, fx_margin: 3.5, speed: 36 } },
  ],
  tokenisation: [
    { id: 'everywhere', label: 'Tokenised everywhere',
      sliders: { token_penetration: 95, auth_uplift: 5, ic_differential: 15, merchant_pan_storage: 5, vault_cost: 0.3 } },
    { id: 'status_quo', label: 'Status quo', sliders: null },
    { id: 'underinvest', label: 'Underinvestment',
      sliders: { token_penetration: 50, auth_uplift: 2, ic_differential: 0, merchant_pan_storage: 40, vault_cost: 1.2 } },
  ],
  bnpl: [
    { id: 'unleashed', label: 'Surcharge unleashed',
      sliders: { surcharge_allowed: 15, avg_bnpl_cost: 4, user_switch: 70, licensing_drag: 8, bnpl_volume_share: 6 } },
    { id: 'status_quo', label: 'Status quo', sliders: null },
    { id: 'keeps_winning', label: 'BNPL keeps winning',
      sliders: { surcharge_allowed: 85, avg_bnpl_cost: 3.0, user_switch: 25, licensing_drag: 4, bnpl_volume_share: 18 } },
  ],
  cdr: [
    { id: 'takes_off', label: 'Open banking takes off',
      sliders: { a2a_share: 15, consent_friction: 30, cdr_participants: 300, acceptance_cost: 20, refund_ux: 70 } },
    { id: 'status_quo', label: 'Status quo', sliders: null },
    { id: 'underdelivers', label: 'CDR underdelivers',
      sliders: { a2a_share: 2, consent_friction: 85, cdr_participants: 100, acceptance_cost: 30, refund_ux: 20 } },
  ],
  fraudai: [
    { id: 'flips_curve', label: 'AI flips the curve',
      sliders: { fraud_loss: 35, passkey_adoption: 70, ai_capex_fraud: 25, false_positive: 4, scam_losses: 1500 } },
    { id: 'status_quo', label: 'Status quo', sliders: null },
    { id: 'scam_crisis', label: 'Scam crisis deepens',
      sliders: { fraud_loss: 110, passkey_adoption: 20, ai_capex_fraud: 8, false_positive: 14, scam_losses: 4000 } },
  ],
};
