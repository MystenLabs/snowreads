import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import InformationPopup from "../components/landingComponents/InformationPopup";

const TOSPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="flex flex-col items-center justify-center flex-grow bg-primary px-8 sm:px-12 lg:px-16">
        <div className="lg:max-w-[1100px] w-full mx-auto py-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-6 text-left">
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-6 text-left">
            <strong>Last Updated:</strong> October 21, 2024
          </p>
          <p className="text-gray-600 mb-6 text-left">
            These Terms of Service (<span className="font-bold">"Terms”</span>)
            govern your use of certain software services, including, SnowReads
            provided by Mysten Labs, Inc. (
            <span className="font-bold">“Mysten Labs”</span>) (collectively the
            <span className="font-bold">"Services"</span>). By accessing the
            Services, you agree to and accept these terms and conditions. If you
            don’t agree to be bound by these Terms, do not use the Services.
          </p>
          <p className="text-gray-600 mb-6 text-left">
            IMPORTANT NOTICE REGARDING ARBITRATION FOR U.S. CUSTOMERS: WHEN YOU
            AGREE TO THESE TERMS YOU ARE AGREEING (WITH LIMITED EXCEPTION) TO
            RESOLVE ANY DISPUTE BETWEEN YOU AND MYSTEN LABS THROUGH BINDING,
            INDIVIDUAL ARBITRATION RATHER THAN IN COURT. PLEASE REVIEW CAREFULLY
            SECTION XIV “DISPUTE RESOLUTION” BELOW FOR DETAILS REGARDING
            ARBITRATION.
          </p>

          {/* I. Privacy Policy */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            I. Privacy Policy
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            Please review our Privacy Policy, which also governs your use of the
            Services, for information on how we collect, use and share your
            information. By using the Services you agree to be bound by our
            Privacy Policy.
          </p>

          {/* II. Eligibility */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            II. Eligibility
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            You may use the Services only if you are 18 years or older and
            capable of forming a binding contract with Mysten Labs, and not
            otherwise barred from using the Services under applicable law,
            including applicable U.S. and non-U.S. export control and trade
            sanctions laws.
          </p>

          {/* III. SnowReads */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            III. SnowReads
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            The Services allow you access, view and download content stored on a
            decentralized storage protocol through our website (the{" "}
            <span className="font-bold">"Services"</span>). This content was
            obtained from arxiv.org and includes copyrighted works owned by
            third parties and subject to intellectual property licenses (
            <span className="font-bold">"Licensed Content”</span>). Use of the
            content provided through the Services is governed by these Terms and
            any applicable copyright licenses or agreements. We do not claim
            ownership of, and assume no responsibility for, any Licensed Content
            accessible through the Services.
          </p>
          <p className="text-gray-600 mb-6 text-left">
            Summaries of content on SnowReads may be provided. These summaries
            are generated using artificial intelligence (
            <span className="font-bold">“AI”</span>) technology and may not
            fully reflect the original source material in its entirety.
            AI-generated content may contain inaccuracies, omissions, or
            interpretations that differ from the original work. Users are
            encouraged to consult the original document for a complete
            understanding of the material. We make no guarantees about the
            completeness, accuracy, or reliability of the AI-generated content.
            Use of the content is at your own risk, and we disclaim any
            liability for errors or omissions.
          </p>

          {/* IV. Service Conditions and Disclaimers */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            IV. Service Conditions and Disclaimers
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            <strong>A. Fees:</strong> We may charge fees for some or part of the
            Services we make available to you. We reserve the right to change
            those fees at any time, in our sole and absolute discretion.
          </p>
          <p className="text-gray-600 mb-6 text-left">
            <strong>B. Acknowledgment of Certain Risks; Disclaimers:</strong>{" "}
            Mysten Labs disclaims any and all responsibility or liability for
            the accuracy, content, completeness, legality, reliability, or
            operability or availability of information or material accessed via
            the Services. Mysten Labs disclaims any responsibility for the
            deletion, failure to store, misdelivery, or untimely delivery of any
            information or material. Mysten Labs disclaims any responsibility
            for any harm resulting from accessing any information or material on
            any blockchain through the Services. YOU UNDERSTAND AND AGREE THAT
            YOU DOWNLOAD OR OTHERWISE OBTAIN MATERIAL OR DATA THROUGH THE USE OF
            THE SERVICES AT YOUR OWN DISCRETION AND RISK AND THAT YOU WILL BE
            SOLELY RESPONSIBLE FOR ANY DAMAGES TO YOUR COMPUTER SYSTEM OR LOSS
            OF DATA THAT RESULTS IN THE DOWNLOAD OF SUCH MATERIAL OR DATA.
          </p>
          <p className="text-gray-600 mb-6 text-left">
            The Services could be impacted by one or more regulatory inquiries
            or regulatory actions, which could impede or limit the ability of
            Mysten Labs to continue to make its proprietary software, and thus,
            could impede or limit your ability to continue to use the Services.
            <br />
            You understand that the Walrus Store and Sui blockchain (and all
            other networks with which the Services may be compatible) remain
            under development, which creates technological and security risks
            when using the Services in addition to uncertainty relating to
            Digital Assets and transactions therein. You acknowledge that the
            cost of transacting on the Sui blockchain is variable and may
            increase at any time, thereby impacting any activities taking place
            on the Sui blockchain, which may result in price fluctuations or
            increased prices for using the Services. <br />
            The Services are provided to you "as-is" and "with all faults." We
            make no warranties or representations regarding the functionality,
            quality, or fitness for a particular purpose of the Services. By
            using the Services, you acknowledge and agree to the following:
            <br />
          </p>
          {/* TODO */}
          <p className="text-gray-600 mb-6 text-left">
            (1) Mysten Labs disclaims all warranties, whether express, implied,
            or statutory, including but not limited to any warranties of
            merchantability, non-infringement, and fitness for a particular
            purpose. <br />
            (2) Mysten Labs does not guarantee that the Services will be free
            from errors, bugs, or interruptions in service, including failed
            transactions for which you have paid associated gas fees. Any use of
            the Services is at your own risk. <br />
            (3) Mysten Labs shall not be liable for any direct, indirect,
            incidental, special, or consequential damages, whether arising from
            the use of the Services or any inability to use the Services, even
            if Mysten Labs has been advised of the possibility of such damages.{" "}
            <br />
            (4) It is your responsibility to evaluate the accuracy,
            completeness, and usefulness of any information, content, or data
            provided by the Services. <br />
            (5) Mysten Labs is under no obligation to provide support,
            maintenance, updates, or fixes for the Services. <br />
            (6) Mysten Labs is not obligated to correct or address any errors,
            defects, or issues identified in the Services.
            <br />
            (7) Mysten Labs may change, update, or discontinue the Services at
            any time without notice. <br />
            (8) Your use of the Services indicates your acceptance of the risk
            associated with its use.
          </p>

          {/* V. Ownership & User Responsibilities */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            V. Ownership & User Responsibilities
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            We reserve all rights not expressly granted to you in these Terms.
            These Terms do not grant you any rights to our trademarks or service
            marks.
          </p>
          <p className="text-gray-600 mb-6 text-left">
            <strong>A. Ownership of Copyrighted Content:</strong> All Licensed
            Content provided through the Services remains the property of its
            respective copyright holders, and you may only use it as permitted
            by the applicable licenses.
          </p>
          <p className="text-gray-600 mb-6 text-left">
            <strong>B. Third-Party Licenses:</strong> Content made available by
            the Services may be licensed from third-party providers. The
            Services will indicate which license applies to the Licensed
            Content. Your use of such content is subject to additional terms and
            conditions imposed by those licensors. By using the Licensed
            Content, you agree to comply with the terms of any relevant license
            agreement.
          </p>
          <p className="text-gray-600 mb-6 text-left">
            <strong>C. Limited License to Users:</strong> Subject to these Terms
            and any applicable license agreements, we grant you a limited,
            non-exclusive, non-transferable license to access and use the
            Licensed Content solely for personal, non-commercial purposes or as
            otherwise authorized by the specific license governing the content.
          </p>
          <p className="text-gray-600 mb-6 text-left">
            <strong>D. No Unauthorized Use.</strong> You agree not to reproduce,
            distribute, publicly display, perform, or create derivative works
            from the Licensed Content without express permission from the rights
            holder, except as permitted under applicable copyright laws
          </p>

          <p className="text-gray-600 mb-6 text-left">
            <strong>E. User Responsibilities:</strong> You are solely
            responsible for your use of the Services and any Licensed Content
            accessed through it. The content is provided solely for
            informational and personal use. You agree that your use of the
            Service, including accessing, downloading, or otherwise using
            Licensed Content, is at your own discretion and risk. When using the
            Service, you agree that:
          </p>
          <p>
            <span className="font-bold">a. Compliance with Licenses:</span> You
            are solely responsible for ensuring that your use of the Licensed
            Content complies with the applicable copyright license terms. Misuse
            of Licensed Content may result in suspension of your account or
            other legal consequences.
          </p>
          <p>
            <span className="font-bold">b. Prohibited Uses:</span> You may not
            use the Licensed Content for commercial purposes, redistribute it,
            or attempt to sublicense it unless specifically permitted by the
            applicable license or with explicit permission from the copyright
            owner.
          </p>
          <p>
            <span className="font-bold">c. No Circumvention: </span>You agree
            not to circumvent, disable, or otherwise interfere with any digital
            rights management (DRM) technologies or content protection
            mechanisms applied to the Licensed Content.
          </p>
          <p>
            <span className="font-bold">d. Attribution.</span> Certain Licensed
            Content may require you to provide appropriate attribution to the
            original author or copyright owner as specified in the applicable
            license (e.g., Creative Commons licenses). Failure to provide proper
            attribution may result in legal liability.
            <br /> <br />
            <p>
              Any unauthorized use of the Licensed Content may violate copyright
              laws, and we disclaim any liability related to any such
              violations.
            </p>
            <br />
          </p>

          {/* VI. General Prohibitions and Enforcement Rights */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            <span className="font-bold">
              VI. General Prohibitions and Mysten Labs’s Enforcement Rights.
            </span>{" "}
            <span className="font-base">
              You agree not to do any of the following:
            </span>
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            A. Use, display, mirror or frame the Services or any individual
            element within the Services, Mysten Labs’s name, any Mysten Labs
            trademark, logo or other proprietary information, or the layout and
            design of any page or form contained on a page, without Mysten
            Labs’s express written consent; <br />
            B. Access,tamperwith,orusenon-publicareasoftheServices,MystenLabs’s
            computer systems, or the technical delivery systems of Mysten Labs’s
            providers; <br />
            C. Attempt to probe,scan or test the vulnerability of any Mysten
            Labs system or network or breach any security or authentication
            measures; <br />
            D. Avoid, bypass, remove, deactivate, impair, descramble or
            otherwise circumvent any technological measure implemented by Mysten
            Labs or any of Mysten Labs’s providers or any other third party
            (including another user) to protect the Services; <br />
            E. Attempt to access or search the Services or download content from
            the Services using any engine, software, tool, agent, device or
            mechanism (including spiders, robots, crawlers, data mining tools or
            the like) other than the software and/or search agents provided by
            Mysten Labs or other generally available third-party web browsers;{" "}
            <br />
            F. Send any unsolicited or unauthorized advertising, promotional
            materials, email, junk mail, spam, chain letters or other form of
            solicitation;
            <br />
            G. Use any meta tags or other hidden text or metadata utilizing a
            Mysten Labs trademark, logo URL or product name without Mysten
            Labs’s express written consent; <br />
            H. Use the Services, or any portion thereof,for any commercial
            purpose or for the benefit of any third party or in any manner not
            permitted by these Terms; <br />
            I. Forge any TCP/IP packet header or any part of the header
            information in any email or newsgroup posting, or in any way use the
            Services to send altered, deceptive or false source-identifying
            information; <br />
            J. Attempt to decipher, decompile, disassemble or reverse engineer
            any of the software used to provide the Services;
            <br />
            K. Interfere with, or attempt to interfere with, the access of any
            user, host or network, including, without limitation, sending a
            virus, overloading, flooding, spamming, or mail-bombing the
            Services; <br />
            L. Collect or store any personally identifiable information from the
            Services from other users of the Services without their express
            permission; <br />
            M. Impersonate or misrepresent your affiliation with any person or
            entity; <br />
            N. Violateanyapplicablelaworregulation;or <br />
            O. Encourage or enable any other individual to do any of the
            foregoing. Mysten Labs is not obligated to monitor access to or use
            of the Services or to review or edit any content. However, we have
            the right to do so for the purpose of operating the Services, to
            ensure compliance with these Terms and to comply with applicable law
            or other legal requirements. We reserve the right, but are not
            obligated, to remove or disable access to any content, at any time
            and without notice, including, but not limited to, if we, at our
            sole discretion, consider it objectionable or in violation of these
            Terms. <br />
            <br />
            We have the right to investigate violations of these Terms or
            conduct that affects the Services. We may also consult and cooperate
            with law enforcement authorities to prosecute users who violate the
            law.
          </p>

          {/* VII. DMCA/Copyright Policy */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            VII. DMCA/Copyright Policy
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            Mysten Labs respects copyright law and expects its users to do the
            same. It is Mysten Labs’ policy to terminate in appropriate
            circumstances users who repeatedly infringe or are believed to be
            repeatedly infringing the rights of copyright holders.
          </p>

          {/* VIII. Sanctions */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            VIII. Sanctions
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            Without limiting the foregoing, you may not download or use the
            Services if (i) you are in, under the control of, or a national or
            resident of Cuba, Iran, North Korea, Syria or any other country
            subject to United States embargo, or if you are on the U.S. Treasury
            Department's Specially Designated Nationals List or the U.S.
            Commerce Department's Denied Persons List, Unverified List, or
            Entity List; or (ii) you intend to supply any Services to Cuba,
            Iran, North Korea, Sudan or Syria or any other country subject to
            United States embargo (or a national or resident of one of these
            countries), or to a person on the Specially Designated Nationals
            List, Denied Persons List, Unverified List, or Entity List.
          </p>

          {/* IX. Termination */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            IX. Termination
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            We may suspend or terminate your access to and use of the Services,
            including suspending access to or terminating your account, at our
            sole discretion, at any time and without notice to you. You may
            cancel your account, if you have one, at any time by removing the
            Wallet web browser extension and ceasing any and all use of the
            Services. Upon any termination, discontinuation or cancellation of
            the Services or your account, the following Sections will survive:
            VIII and IX- XV.
          </p>

          {/* X. Warranty Disclaimers */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            X. Warranty Disclaimers
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            THE SERVICES ARE PROVIDED “AS IS,” WITHOUT WARRANTY OF ANY KIND.
            WITHOUT LIMITING THE FOREGOING, WE EXPLICITLY DISCLAIM ANY IMPLIED
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
            QUIET ENJOYMENT AND NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT
            OF COURSE OF DEALING OR USAGE OF TRADE. We make no warranty that the
            Services will meet your requirements, will function as intended,
            will be free from bugs or errors, or be available on an
            uninterrupted, secure, or error-free basis. We make no warranty
            regarding the quality, accuracy, timeliness, truthfulness,
            completeness or reliability of any information or content on the
            Services. We may modify or terminate the Services at any time, with
            or without notice to you.
          </p>

          {/* XI. Indemnity */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            XI. Indemnity
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            You will indemnify and hold Mysten Labs and its officers, directors,
            employees and agents, harmless from and against any claims,
            disputes, demands, liabilities, damages, losses, and costs and
            expenses, including, without limitation, reasonable legal and
            accounting fees arising out of or in any way connected with (a) your
            access to or use of the Services, (b) your User Content, or (c) your
            violation of these Terms.
          </p>

          {/* XII. Limitation of Liability */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            XII. Limitation of Liability
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            A. TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER MYSTENLABS NOR
            ITS SERVICE PROVIDERS INVOLVED IN CREATING, PRODUCING, OR DELIVERING
            THE SERVICES WILL BE LIABLE FOR ANY INCIDENTAL, SPECIAL, EXEMPLARY
            OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOST PROFITS, LOST
            REVENUES, LOST SAVINGS, LOST BUSINESS OPPORTUNITY, LOSS OF DATA OR
            GOODWILL, SERVICE INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE OR
            THE COST OF SUBSTITUTE SERVICES OF ANY KIND ARISING OUT OF OR IN
            CONNECTION WITH THESE TERMS OR FROM THE USE OF OR INABILITY TO USE
            THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING
            NEGLIGENCE), PRODUCT LIABILITY OR ANY OTHER LEGAL THEORY, AND
            WHETHER OR NOT MYSTEN LABS OR ITS SERVICE PROVIDERS HAVE BEEN
            INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, EVEN IF A LIMITED REMEDY
            SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
            <br />
            <br />
            B. TO THE MAXIMUM EXTENT PERMITTED BY LAW,IN NO EVENT WILL MYSTEN
            LABS’ TOTAL LIABILITY ARISING OUT OF OR IN CONNECTION WITH THESE
            TERMS OR FROM THE USE OF OR INABILITY TO USE THE SERVICES EXCEED THE
            AMOUNTS YOU HAVE PAID OR ARE PAYABLE BY YOU TO MYSTEN LABS FOR USE
            OF THE SERVICES OR ONE HUNDRED DOLLARS ($100), IF YOU HAVE NOT HAD
            ANY PAYMENT OBLIGATIONS TO MYSTEN LABS, AS APPLICABLE. C. THE
            EXCLUSIONS ANDL IMITATIONS OF DAMAGES SET FORTH ABOVE ARE
            FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN MYSTEN LABS
            AND YOU.
          </p>

          {/* XIII. Governing Law and Forum Choice */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            XIII. Governing Law and Forum Choice
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            These Terms and any action related thereto will be governed by the
            Federal Arbitration Act, federal arbitration law, and the laws of
            the State of California, without regard to its conflict of laws
            provisions. Except as otherwise expressly set forth in Section XIV
            “Dispute Resolution,” the exclusive jurisdiction for all Disputes
            (defined below) that you and Mysten Labs are not required to
            arbitrate will be the state and federal courts located in the County
            of Santa Clara, and you and Mysten Labs each waive any objection to
            jurisdiction and venue in such courts.
          </p>

          {/* XIV. Dispute Resolution */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            XIV. Dispute Resolution
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            A. Mandatory Arbitration of Disputes. We each agree that any
            dispute, claim or controversy arising out of or relating to these
            Terms or the breach, termination, enforcement, interpretation or
            validity thereof or the use of the Services (collectively,
            “Disputes”) will be resolved solely by binding, individual
            arbitration and not in a class, representative or consolidated
            action or proceeding. You and Mysten Labs agree that the U.S.
            Federal Arbitration Act governs the interpretation and enforcement
            of these Terms, and that you and Mysten Labs are each waiving the
            right to a trial by jury or to participate in a class action. This
            arbitration provision shall survive termination of these Terms.
            <br />
            <br />
            B. Exceptions. As limited exceptions to Section XIV(A) above: (i) we
            both may seek to resolve a Dispute in small claims court if it
            qualifies; and (ii) we each retain the right to seek injunctive or
            other equitable relief from a court to prevent (or enjoin) the
            infringement or misappropriation of our intellectual property
            rights.
            <br />
            <br />
            C. Conducting Arbitration and Arbitration Rules. The arbitration
            will be conducted by the American Arbitration Association (“AAA”)
            under its Consumer Arbitration Rules (the “AAA Rules”) then in
            effect, except as modified by these Terms. The AAA Rules are
            available at www.adr.org or by calling 1-800-778-7879. A party who
            wishes to start arbitration must submit a written Demand for
            Arbitration to AAA and give notice to the other party as specified
            in the AAA Rules. The AAA provides a form Demand for Arbitration at
            www.adr.org. Any arbitration hearings will take place in the county
            (or parish) where you live, unless we both agree to a different
            location. The parties agree G. XV. A. D. E. that the arbitrator
            shall have exclusive authority to decide all issues relating to the
            interpretation, applicability, enforceability and scope of this
            arbitration agreement. <br />
            <br />
            D. Arbitration Costs. Payment of all filing, administration and
            arbitrator fees will be governed by the AAA Rules, and we won’t seek
            to recover the administration and arbitrator fees we are responsible
            for paying, unless the arbitrator finds your Dispute frivolous. If
            we prevail in arbitration we’ll pay all of our attorneys’ fees and
            costs and won’t seek to recover them from you. If you prevail in
            arbitration you will be entitled to an award of attorneys’ fees and
            expenses to the extent provided under applicable law. <br />
            <br />
            E. Injunctive and Declaratory Relief. Except as provided in Section
            XIV(B) above, the arbitrator shall determine all issues of liability
            on the merits of any claim asserted by either party and may award
            declaratory or injunctive relief only in favor of the individual
            party seeking relief and only to the extent necessary to provide
            relief warranted by that party’s individual claim. To the extent
            that you or we prevail on a claim and seek public injunctive relief
            (that is, injunctive relief that has the primary purpose and effect
            of prohibiting unlawful acts that threaten future injury to the
            public), the entitlement to and extent of such relief must be
            litigated in a civil court of competent jurisdiction and not in
            arbitration. The parties agree that litigation of any issues of
            public injunctive relief shall be stayed pending the outcome of the
            merits of any individual claims in arbitration. <br />
            <br />
            F. Class Action Waiver. YOU AND MYSTEN LABS AGREE THAT EACH MAY
            BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL
            CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED
            CLASS OR REPRESENTATIVE PROCEEDING. Further, if the parties’ Dispute
            is resolved through arbitration, the arbitrator may not consolidate
            another person’s claims with your claims, and may not otherwise
            preside over any form of a representative or class proceeding. If
            this specific provision is found to be unenforceable, then the
            entirety of this Dispute Resolution section shall be null and void.
            <br />
            <br />
            G. Severability. With the exception of any of the provisions in
            Section XIV(F) of these Terms (“Class Action Waiver”), if an
            arbitrator or court of competent jurisdiction decides that any part
            of these Terms is invalid or unenforceable, the other parts of these
            Terms will still apply.
          </p>

          {/* XV. General Terms */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            XV. General Terms
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            A. Reservation of Rights. Mysten Labs and its licensors exclusively
            own all right, title and interest in and to the Services, including
            all associated intellectual property rights. You acknowledge that
            the Services are protected by copyright, trademark, and other laws
            of the United States and foreign countries. You agree not to remove,
            alter or obscure any copyright, trademark, service mark or other
            proprietary rights notices incorporated in or accompanying the
            Services. <br />
            <br />
            B. Entire Agreement. These Terms constitute the entire and exclusive
            understanding and agreement between Mysten Labs and you regarding
            the Services, and these Terms supersede and replace all prior oral
            or written understandings or agreements between Mysten Labs and you
            regarding the Services. If any provision of these Terms is held
            invalid or unenforceable by an arbitrator or a court of competent
            jurisdiction, that provision will be enforced to the maximum extent
            permissible and the other provisions of these Terms will remain in
            full force and effect. Except where provided by applicable law in
            your jurisdiction, you may not assign or transfer these Terms, by
            operation of law or otherwise, without Mysten Labs’ prior written
            consent. Any attempt by you to assign or transfer these Terms absent
            our consent or your statutory right, without such consent, will be
            null. Mysten Labs may freely assign or transfer these Terms without
            restriction. Subject to the foregoing, these Terms will bind and
            inure to the benefit of the parties, their successors and permitted
            assigns. <br />
            <br />
            C. Notices. Any notices or other communications provided by Mysten
            Labs under these Terms will be given: (i) via email; or (ii) by
            posting to the Services. For notices made by email, the date of
            receipt will be deemed the date on which such notice is transmitted.
          </p>
          {/* XV. Contact Information */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            XVI. Contact Information
          </h2>
          <p className="text-gray-600 mb-6 text-left">
            If you have any questions about these Terms or the Services, please
            contact Mysten Labs at {""}
            <a
              href="mailto:legal@mystenlabs.com"
              className="text-purple-600 underline"
            >
              legal@mystenlabs.com
            </a>
            .
          </p>
          <br />
          <br />
          <div className="flex justify-start mt-6">
            <button
              onClick={handleGoBack}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
        <InformationPopup />
      </section>
      <Footer />
    </div>
  );
};

export default TOSPage;
