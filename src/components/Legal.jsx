import React from 'react';

function H1({ children }) {
  return <h1 className="font-display text-[34px] md:text-[44px] grad-text leading-[1.1] pb-1 mt-12">{children}</h1>;
}
function H2({ children }) {
  return <h2 className="font-display text-[20px] md:text-[24px] mt-10 mb-3 text-white/95">{children}</h2>;
}
function H3({ children }) {
  return <h3 className="font-display text-[14px] mt-6 mb-2 ink2 uppercase tracking-[0.12em]">{children}</h3>;
}
function P({ children }) {
  return <p className="text-[14px] leading-relaxed ink2 mb-3">{children}</p>;
}

export default function Legal({ onHome }) {
  return (
    <div className="min-h-screen relative">
      <div className="landing-bg"></div>
      <div className="relative z-10 max-w-[820px] mx-auto px-6 md:px-10 pt-10 pb-24">
        <div className="flex items-center justify-between">
          <button onClick={onHome} className="text-[12px] ink3 hover:text-white transition flex items-center gap-2">
            <span>←</span> Back to the model
          </button>
          <div className="text-[10.5px] ink3 uppercase tracking-[0.18em]">Legal</div>
        </div>

        <div className="text-[10.5px] uppercase tracking-[0.22em] ink3 mt-12">AussiePay Scenario Engine</div>
        <H1>Legal Documents</H1>
        <P>Privacy Policy, Terms of Use, and Disclaimer</P>
        <P><span className="ink3">Last updated:</span> April 2026</P>
        <P>
          AussiePay Scenario Engine (aussiepay.netlify.app) is a personal, non-commercial project built for educational
          and research purposes. It explores forward-looking topics in Australian payments using publicly available
          data and AI-generated analysis.
        </P>
        <P>This document contains the Privacy Policy, Terms of Use, and Disclaimer that govern your use of the tool.</P>

        <H2>1. Privacy Policy</H2>

        <H3>1.1 Overview</H3>
        <P>
          AussiePay Scenario Engine (the "Tool") is a personal, non-commercial project built for educational and
          research purposes. It is not operated by a company, organisation, or employer. This Privacy Policy explains
          how information is collected, used, and protected when you use the Tool.
        </P>

        <H3>1.2 Who operates this Tool</H3>
        <P>
          The Tool is built and maintained by an individual as a personal project. It was developed entirely in the
          author's personal capacity, on personal time, using personal equipment and resources. It is not affiliated
          with, endorsed by, or representative of any employer, company, card network, financial institution, payment
          scheme, regulator, or industry body. All views, analysis, and content are the author's own.
        </P>

        <H3>1.3 What we collect</H3>
        <P>
          <strong className="text-white/95">No usage data is collected by the Tool itself.</strong> The Tool does not
          set cookies, does not use analytics platforms (such as Google Analytics), does not run advertising or
          marketing trackers, and does not generate session identifiers.
        </P>
        <P>
          The only data that exists about your visit is standard server logs collected by the hosting provider
          (Netlify), which may include IP address, browser type, and request timestamps. These are governed by
          Netlify's own privacy policy and are not accessed or used by the author for any analytical purpose.
        </P>
        <P>
          When you click "Generate strategic brief," the scenario configuration you have set (the topic, your selected
          role, and the lever positions) is sent to the Grok API to generate the brief. No personal data is included
          in this call. See section 1.4 for details on third-party services.
        </P>

        <H3>1.4 Third-party services</H3>
        <P>The Tool uses the following third-party services:</P>
        <P>
          <strong className="text-white/95">Grok API (x.ai)</strong> for AI-generated strategic briefs. Scenario
          configurations (topic, role, lever positions) are sent to the Grok API to generate analysis. No personal
          data is included in these API calls. Scenario data sent to the Grok API is handled in accordance with xAI's
          API terms and privacy policy. As of April 2026, xAI's commercial API terms do not use API inputs for model
          training by default, but users should review xAI's current terms for the latest position.
        </P>
        <P>
          <strong className="text-white/95">Netlify (netlify.com)</strong> for hosting. Netlify may collect standard
          server logs (IP addresses, browser type) as part of its hosting infrastructure. This is governed by
          Netlify's privacy policy.
        </P>
        <P>No advertising networks, marketing trackers, retargeting pixels, or analytics platforms are used.</P>

        <H3>1.5 Future features</H3>
        <P>
          If a future feature collects any user data (for example, an optional "save scenario" feature that asks for
          an email address), it will be entirely voluntary, clearly labelled at the point of collection, and
          accompanied by an updated version of this Privacy Policy.
        </P>

        <H3>1.6 Cookies</H3>
        <P>The Tool does not set any cookies.</P>

        <H3>1.7 Children</H3>
        <P>
          The Tool is not directed at children under 16. We do not knowingly collect information from children.
        </P>

        <H3>1.8 Australian Privacy Act</H3>
        <P>
          As a personal, non-commercial project operated by an individual (not an organisation with an annual turnover
          above the relevant threshold), the Tool is unlikely to be subject to the Australian Privacy Act 1988 or the
          Australian Privacy Principles (APPs). However, the author makes no legal determination on this point.
          Regardless of the Act's applicability, the Tool is designed to collect the minimum data necessary and to
          handle it responsibly and in the spirit of good privacy practice.
        </P>

        <H3>1.9 Changes to this policy</H3>
        <P>
          This policy may be updated from time to time. The "Last updated" date at the top of this document will
          reflect the most recent revision. Continued use of the Tool after changes constitutes acceptance of the
          revised policy.
        </P>

        <H3>1.10 Contact</H3>
        <P>
          Questions about this Privacy Policy can be directed to the author via the GitHub repository at{' '}
          <a href="https://github.com/xby-tech/paymentsadvisorypractice" className="text-[#7cf2c8] hover:underline">
            github.com/xby-tech/paymentsadvisorypractice
          </a>
          .
        </P>

        <H2>2. Terms of Use</H2>

        <H3>2.1 Acceptance</H3>
        <P>
          By accessing and using AussiePay Scenario Engine (the "Tool"), you agree to be bound by these Terms of Use.
          If you do not agree, please do not use the Tool.
        </P>

        <H3>2.2 Nature of the Tool</H3>
        <P>
          The Tool is a personal, non-commercial project built for educational and research purposes. It is designed
          to help users explore scenario-based thinking about forward-looking topics in Australian payments. It is not
          a product, a service, or a commercial offering. The Tool is provided free of charge. No contract for
          services exists between the author and any user.
        </P>

        <H3>2.3 Not financial, legal, or professional advice</H3>
        <P>
          Nothing in the Tool constitutes financial advice, investment advice, legal advice, tax advice, accounting
          advice, regulatory guidance, or professional consulting of any kind. The scenario outputs, AI-generated
          strategic briefs, and all other content are hypothetical explorations based on publicly available data and
          AI inference. They should not be relied upon for any business, investment, regulatory, commercial, or
          personal financial decision. If you require professional advice, consult a qualified and licensed
          professional.
        </P>

        <H3>2.4 Personal project, built independently</H3>
        <P>
          This Tool was developed entirely in the author's personal capacity, on personal time, using personal
          equipment and resources. No proprietary, confidential, commercially sensitive, or non-public information
          from any employer (past or present), client, or third party has been used in its development, calibration,
          or operation. All data sources are publicly available and cited within the Tool. All analytical framing,
          scenario models, variable selections, and commentary represent the author's personal opinions informed
          solely by publicly available information. The author's professional experience informs the selection and
          framing of topics, but no non-public data, internal analysis, client information, or employer intellectual
          property has been incorporated into the Tool.
        </P>

        <H3>2.5 No affiliation or endorsement</H3>
        <P>
          The Tool is not affiliated with, endorsed by, sponsored by, or representative of any employer (past or
          present), company, card network, payment scheme, financial institution, acquirer, payment service provider,
          regulator, industry body, or any other organisation. No organisation has authorised, reviewed, approved, or
          had any input into the Tool or its content. Reference to any organisation within the Tool is for educational
          context only and does not imply any relationship, endorsement, approval, or access to non-public
          information. No organisation referenced in the Tool has any involvement in, responsibility for, or control
          over the Tool or its content.
        </P>

        <H3>2.6 Data sources and limitations</H3>
        <P>
          The Tool uses publicly available data from sources including (but not limited to) the Reserve Bank of
          Australia, Australian Payments Network, the European Commission, the Bank for International Settlements, and
          published industry submissions. While reasonable effort is made to ensure accuracy, no guarantee is made
          that any data point is current, complete, or error-free. Data may be outdated, selectively presented,
          simplified for scenario modelling purposes, or presented without the full context available in the original
          source. Users should consult original sources directly for complete and authoritative information.
        </P>

        <H3>2.7 AI-generated content</H3>
        <P>
          Strategic briefs and certain analytical outputs are generated by artificial intelligence (currently the Grok
          API by xAI). AI-generated content is clearly labelled within the Tool. AI-generated strategic briefs are
          hypothetical outputs produced by a third-party AI model. They are not verified, validated, or endorsed by
          the author. They may be factually incorrect, commercially misleading, internally inconsistent, or entirely
          fabricated. AI models may produce plausible-sounding analysis that has no basis in reality (commonly known
          as "hallucinations"). No user should act on AI-generated content without independent professional
          verification.
        </P>

        <H3>2.8 No warranty</H3>
        <P>
          The Tool is provided "as is" and "as available" without warranties of any kind, whether express or implied,
          including but not limited to implied warranties of merchantability, fitness for a particular purpose,
          accuracy, reliability, or non-infringement. The author does not warrant that the Tool will be uninterrupted,
          error-free, secure, or free of harmful components.
        </P>

        <H3>2.9 Limitation of liability</H3>
        <P>
          To the maximum extent permitted by applicable law, the author shall not be liable for any direct, indirect,
          incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the
          Tool. This includes but is not limited to damages for loss of profits, revenue, data, goodwill, business
          opportunity, or other intangible losses, even if the author has been advised of the possibility of such
          damages. This limitation applies whether the claim is based in contract, tort (including negligence), strict
          liability, or any other legal theory.
        </P>

        <H3>2.10 Australian Consumer Law</H3>
        <P>
          The Tool is provided free of charge as a personal educational project. No goods or services are being sold
          or supplied in trade or commerce. To the extent that the Australian Consumer Law (Schedule 2 of the
          Competition and Consumer Act 2010) applies, nothing in these Terms is intended to exclude, restrict, or
          modify any consumer guarantee or right that cannot be excluded under that law. However, the author's
          liability for any breach of a non-excludable consumer guarantee is limited, to the maximum extent permitted
          by law, to the re-supply of the relevant service or the payment of the cost of having the service
          re-supplied.
        </P>

        <H3>2.11 Indemnification</H3>
        <P>
          You agree to indemnify, defend, and hold harmless the author from and against any and all claims, demands,
          damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from or related
          to your use of the Tool, your reliance on its content, your violation of these Terms of Use, or your
          violation of any rights of a third party.
        </P>

        <H3>2.12 Intellectual property</H3>
        <P>
          The Tool's design, original written content, and scenario models are the intellectual property of the
          author. The Tool's source code is published openly on GitHub and is shared for educational and inspection
          purposes. You may use the Tool for personal and educational purposes. You may not commercially exploit the
          Tool or its outputs without the author's prior written permission, and any reuse of substantial original
          content must include attribution to AussiePay Scenario Engine with a link to aussiepay.netlify.app. Data
          sourced from third parties (including the RBA, AusPayNet, EU Commission, BIS, and others) remains the
          property of those respective organisations and is used under fair dealing for research and education.
        </P>

        <H3>2.13 Acceptable use</H3>
        <P>
          You agree not to: use the Tool for any unlawful purpose; misrepresent AI-generated content as verified
          professional, financial, or legal advice; present the Tool's outputs as the views, analysis, or endorsed
          position of any organisation; present AI-generated outputs as your own original analysis without attribution
          to the Tool; attempt to extract, scrape, or systematically download data from the Tool; interfere with the
          Tool's operation, security, or infrastructure; or use the Tool in any way that could damage the author's
          reputation or the reputation of any referenced organisation.
        </P>

        <H3>2.14 Availability and modification</H3>
        <P>
          The Tool is a personal project and may be modified, updated, suspended, or discontinued at any time without
          notice. The author is under no obligation to maintain, update, support, or continue operating the Tool.
          Features, data, and scenario models may change without warning.
        </P>

        <H3>2.15 Dispute resolution</H3>
        <P>
          Before initiating any legal proceedings relating to the Tool, you agree to contact the author in writing to
          attempt to resolve any dispute informally. Both parties will make reasonable efforts to resolve the dispute
          within 30 days of such notice.
        </P>

        <H3>2.16 Governing law and jurisdiction</H3>
        <P>
          These Terms of Use are governed by and construed in accordance with the laws of the State of Victoria,
          Australia. Subject to the informal resolution process in section 2.15, any disputes arising from the use of
          the Tool shall be subject to the exclusive jurisdiction of the courts of Victoria, Australia.
        </P>

        <H3>2.17 Severability</H3>
        <P>
          If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent
          jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall
          be modified to the minimum extent necessary to make it valid and enforceable while preserving its original
          intent.
        </P>

        <H3>2.18 Entire agreement</H3>
        <P>
          These Terms of Use, together with the Privacy Policy and Disclaimer, constitute the entire agreement between
          you and the author regarding your use of the Tool and supersede all prior or contemporaneous communications,
          proposals, and representations with respect to the Tool.
        </P>

        <H3>2.19 Changes to these terms</H3>
        <P>
          These Terms may be updated from time to time. The "Last updated" date will reflect the most recent revision.
          Continued use of the Tool after changes constitutes acceptance of the revised Terms.
        </P>

        <H2>3. Disclaimer</H2>

        <H3>3.1 Educational purpose only</H3>
        <P>
          AussiePay Scenario Engine is a personal educational project. It is designed to facilitate scenario-based
          thinking and strategic exploration of topics in Australian payments. It is not a commercial product,
          advisory service, consulting engagement, or decision-making tool.
        </P>

        <H3>3.2 No professional advice</H3>
        <P>
          The content, scenarios, models, and AI-generated outputs provided by the Tool do not constitute financial,
          investment, legal, regulatory, tax, accounting, or any other form of professional advice. Users should not
          make any business, investment, regulatory, or personal financial decision based on information provided by
          the Tool without first seeking independent advice from a qualified and licensed professional.
        </P>

        <H3>3.3 AI limitations</H3>
        <P>
          AI-generated strategic briefs are produced by large language models that may generate plausible but
          incorrect information (commonly known as "hallucinations"). The AI model may produce outputs that are
          factually wrong, internally contradictory, commercially misleading, based on outdated information, or
          entirely fabricated. The author does not verify, validate, or endorse every AI-generated output. Users are
          solely responsible for independently verifying any information before relying on it for any purpose.
        </P>

        <H3>3.4 Data accuracy</H3>
        <P>
          While the Tool references publicly available data from reputable sources, no representation or warranty is
          made regarding the accuracy, completeness, timeliness, reliability, or fitness for purpose of any data
          displayed. Data may be outdated, may reflect historical rather than current conditions, may have been
          simplified or selectively presented for scenario modelling purposes, and may contain errors or omissions.
          Users should consult original sources directly for complete and authoritative information.
        </P>

        <H3>3.5 No endorsement or affiliation</H3>
        <P>
          Reference to any organisation, product, service, regulation, standard, or individual within the Tool is for
          educational context only and does not constitute an endorsement, recommendation, or affiliation. No
          organisation referenced in the Tool has any involvement in, endorsement of, or responsibility for the Tool,
          its content, or its outputs.
        </P>

        <H3>3.6 Personal views</H3>
        <P>
          All analysis, commentary, scenario framing, and opinions expressed through the Tool are the personal views
          of the author only. They do not represent, reflect, or imply the views, policies, strategies, positions, or
          endorsement of any employer (past or present), client, card network, payment scheme, financial institution,
          regulator, industry body, or any other organisation.
        </P>

        <H3>3.7 No proprietary information</H3>
        <P>
          This Tool was developed using only publicly available data sources. No proprietary, confidential,
          commercially sensitive, or non-public information from any employer (past or present), client, or third
          party has been used in the development, calibration, or operation of the Tool or its scenario models. No
          employer intellectual property, internal analysis, client data, or trade secrets have been incorporated.
          All data sources are publicly available and cited within the Tool.
        </P>

        <H3>3.8 Use at your own risk</H3>
        <P>
          Your use of the Tool is entirely at your own risk. The author accepts no responsibility or liability for any
          loss, damage, cost, expense, or consequence of any kind arising directly or indirectly from your use of the
          Tool, your reliance on its content, or any action or decision taken on the basis of information provided by
          the Tool.
        </P>

        <H3>3.9 Regulatory context</H3>
        <P>
          The Tool discusses regulatory topics including (but not limited to) RBA policy, ACCC proceedings, PSRA
          amendments, interchange regulation, and payments system reform. All regulatory references are based on
          publicly available documents and are presented for educational context only. The Tool does not interpret
          regulation on behalf of any party, does not provide regulatory advice, and should not be used as a
          substitute for professional regulatory or legal counsel. Regulatory positions described in the Tool may be
          simplified, incomplete, or outdated.
        </P>

        <H3>3.10 Forward-looking statements</H3>
        <P>
          The Tool contains scenario models and projections that are inherently forward-looking and speculative. These
          are based on assumptions, publicly available data, and AI inference. They are not predictions, forecasts, or
          guarantees of any future outcome. Actual outcomes may differ materially from any scenario modelled in the
          Tool. Users should not treat any scenario output as a reliable indicator of future market conditions,
          regulatory outcomes, or commercial performance.
        </P>

        <div className="mt-16 pt-6 border-t hairline text-[10.5px] ink3 text-center">
          AussiePay Scenario Engine · aussiepay.netlify.app · Last updated April 2026
        </div>
      </div>
    </div>
  );
}
