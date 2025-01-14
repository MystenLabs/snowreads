import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import InformationPopup from "../components/landingComponents/InformationPopup";
import SidebarNav from "../components/common/SideNavbar";
import MobileNavigationBar from "../components/common/MobileNavigationBar";

const PrivacyPolicyPage: React.FC = () => {
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
            Privacy Policy
          </h1>
          <MobileNavigationBar
            label={"CONTENTS"}
            options={[
              { id: "scope", label: "1. SCOPE" },
              {
                id: "changes_to_our_privacy_policy",
                label: "2. CHANGES TO OUR PRIVACY POLICY",
              },
              {
                id: "personal_information_we_collect",
                label: "3. PERSONAL INFORMATION WE COLLECT",
              },
              {
                id: "how_we_use_your_information",
                label: "4. HOW WE USE YOUR INFORMATION",
              },
              {
                id: "how_we_disclose_your_information",
                label: "5. HOW WE DISCLOSE YOUR INFORMATION",
              },
              {
                id: "your_privacy_choices_and_rights",
                label: "6. YOUR PRIVACY CHOICES AND RIGHTS",
              },
              {
                id: "security_of_your_information",
                label: "7. SECURITY OF YOUR INFORMATION",
              },
              {
                id: "international_data_transfers",
                label: "8. INTERNATIONAL DATA TRANSFERS",
              },
              {
                id: "retention_of_personal_information",
                label: "9. RETENTION OF PERSONAL INFORMATION",
              },
              {
                id: "supplemental_notice_for_california_residents",
                label: "10. SUPPLEMENTAL NOTICE FOR CALIFORNIA RESIDENTS",
              },
              {
                id: "supplemental_notice_for_nevada_residents",
                label: "11. SUPPLEMENTAL NOTICE FOR NEVADA RESIDENTS",
              },
              {
                id: "children_information",
                label: "12. CHILDREN’S INFORMATION",
              },
              {
                id: "third_party_websites_applications",
                label: "13. THIRD-PARTY’S WEBSITES/APPLICATIONS",
              },
              {
                id: "supervisory_authority",
                label: "14. SUPERVISORY AUTHORITY",
              },
              { id: "contact_us", label: "15. CONTACT US" },
            ]}
          ></MobileNavigationBar>
          <p className="text-gray-600 mb-6 text-left">
            <strong>Last Updated:</strong> June 18, 2024
          </p>
          <p className="text-gray-600 mb-6 text-left">
            This Privacy Policy is designed to help you understand how Mysten
            Labs, Inc., its subsidiaries and affiliates (collectively called
            <span className="font-bold">“Mysten Labs”</span>,{" "}
            <span className="font-bold">we,”</span>“{" "}
            <span className="font-bold">“us,”</span> and
            <span className="font-bold">“our”</span>) collects, uses, and shares
            your personal information and to help you understand and exercise
            your privacy rights in accordance with applicable law. This Policy
            applies when you use our websites, contact our team members, engage
            with us on social media or otherwise interact with us.
          </p>
          <SidebarNav
            mode="redirect"
            sections={[
              { id: "scope", label: "1. SCOPE" },
              {
                id: "changes_to_our_privacy_policy",
                label: "2. CHANGES TO OUR PRIVACY POLICY",
              },
              {
                id: "personal_information_we_collect",
                label: "3. PERSONAL INFORMATION WE COLLECT",
              },
              {
                id: "how_we_use_your_information",
                label: "4. HOW WE USE YOUR INFORMATION",
              },
              {
                id: "how_we_disclose_your_information",
                label: "5. HOW WE DISCLOSE YOUR INFORMATION",
              },
              {
                id: "your_privacy_choices_and_rights",
                label: "6. YOUR PRIVACY CHOICES AND RIGHTS",
              },
              {
                id: "security_of_your_information",
                label: "7. SECURITY OF YOUR INFORMATION",
              },
              {
                id: "international_data_transfers",
                label: "8. INTERNATIONAL DATA TRANSFERS",
              },
              {
                id: "retention_of_personal_information",
                label: "9. RETENTION OF PERSONAL INFORMATION",
              },
              {
                id: "supplemental_notice_for_california_residents",
                label: "10. SUPPLEMENTAL NOTICE FOR CALIFORNIA RESIDENTS",
              },
              {
                id: "supplemental_notice_for_nevada_residents",
                label: "11. SUPPLEMENTAL NOTICE FOR NEVADA RESIDENTS",
              },
              {
                id: "children_information",
                label: "12. CHILDREN’S INFORMATION",
              },
              {
                id: "third_party_websites_applications",
                label: "13. THIRD-PARTY’S WEBSITES/APPLICATIONS",
              },
              {
                id: "supervisory_authority",
                label: "14. SUPERVISORY AUTHORITY",
              },
              { id: "contact_us", label: "15. CONTACT US" },
            ]}
            label={"CONTENTS"}
            enlargeWidth={true}
          />

          <section id="scope">
            <h2 className="text-2xl font-semibold text-left mb-4">1. SCOPE</h2>
            <p className="text-gray-600 mb-6 text-left">
              This Privacy Policy applies to personal information processed by
              Mysten Labs, including on our websites (the{" "}
              <span className="font-bold">“Site”</span>), and other online and
              offline offerings. The Site, our services and our other online and
              offline offerings are collectively called the “Services.” For
              clarity, the Services do not include the Walrus Protocol or any
              other decentralized aspect of the Walrus or Sui Blockchain that is
              not controlled by Mysten Labs due to the decentralized nature of
              these blockchains.
            </p>
          </section>

          <section id="changes_to_our_privacy_policy">
            <h2 className="text-2xl font-semibold text-left mb-4">
              2. CHANGES TO OUR PRIVACY POLICY
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              We may revise this Privacy Policy from time to time in our sole
              discretion. If there are any material changes to this Privacy
              Policy, we will notify you as required by applicable law. You
              understand and agree that you will be deemed to have accepted the
              updated Privacy Policy if you continue to use our Services after
              the new Privacy Policy takes effect.
            </p>
          </section>

          <section id="personal_information_we_collect">
            <h2 className="text-2xl font-semibold text-left mb-4">
              3. PERSONAL INFORMATION WE COLLECT
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              The categories of personal information we collect depend on how
              you interact with us, our Services and the requirements of
              applicable law. We collect information that you provide to us,
              information we obtain automatically when you use our Services, and
              information from other sources such as third-party services and
              organizations, as described below.
              <br />
              <br />
              <span className="font-bold text-black">
                A. Information You Provide to Us Directly
              </span>
              <br />
              <br />
              We may collect the following personal information that you provide
              to us.
              <br />
              <span className="font-bold">- Account Creation. </span>We may
              collect information if you create an account with us, such as your
              name, username, email address, or password.
              <br />
              <span className="font-bold">
                - Wallet and Transaction Information.{" "}
              </span>
              In order to engage in transactions on the Services, you may need
              to provide us or our third-party payment processors with access to
              or information about your digital wallet. We will never ask you
              for or collect your private keys.
              <br />
              <span className="font-bold">- Other Transactions.</span> We may
              collect personal information and details associated with your
              activities on our Services, including to deliver you your rewards
              associated with your use of the Services.
              <br />
              <span className="font-bold">
                - Your Communications with Us.
              </span>{" "}
              We may collect personal information, such as email address when
              you request information about our Services, register for our
              newsletter or marketing promotions, request customer or technical
              support, apply for a job or otherwise communicate with us.
              <br />
              <span className="font-bold">- Interactive Features.</span> We and
              others who use our Services may collect personal information that
              you submit or make available through our interactive features
              (e.g., via the Mysten Labs community, commenting functionalities,
              forums, blogs, and social media pages). Any personal information
              you provide on the public sections of these features will be
              considered “public,” unless otherwise required by applicable law,
              and is not subject to the privacy protections referenced herein.
              <br />
              <span className="font-bold">- Surveys.</span> We may contact you
              to participate in surveys. If you decide to participate, you may
              be asked to provide certain information which may include personal
              information.
              <br />
              <span className="font-bold">
                - Sweepstakes, Giveaways or Contests.
              </span>{" "}
              We may collect personal information you provide for any
              sweepstakes, giveaways or contests that we offer. In some
              jurisdictions, we are required to publicly share information of
              sweepstakes and contest winners.
              <br />
              <span className="font-bold">- Events.</span> We may collect
              personal information from individuals when we attend or host
              conferences, trade shows, and other events.
              <br />
              <span className="font-bold">
                - Business Development and Strategic Partnerships.
              </span>{" "}
              We may collect personal information from individuals and third
              parties to assess and pursue potential business opportunities.
              <br />
              <span className="font-bold">- Job Applications.</span> We may post
              job openings and opportunities on our Services. If you reply to
              one of these postings by submitting your application, CV and/or
              cover letter to us, we will collect and use this information to
              assess your qualifications.
            </p>
            <br />
            <span className="font-bold">
              B. Information Collected Automatically
            </span>
            <br />
            <br />
            We may collect personal information automatically when you use our
            Services:
            <br />
            <span className="font-bold">- Automatic Data Collection.</span> We
            may collect certain information automatically when you use our
            Services, such as your Internet protocol (IP) address, user
            settings, MAC address, cookie identifiers, mobile carrier, mobile
            advertising and other unique identifiers, browser or device
            information, location information (including approximate location
            derived from IP address), Internet service provider, and metadata
            about the content you provide. We may also automatically collect
            information regarding your use of our Services, such as pages that
            you visit before, during and after using our Services, information
            about the links you click, the types of content you interact with,
            the frequency and duration of your activities, and other information
            about how you use our Services.
            <br />
            <span className="font-bold">
              - Cookies, Pixel Tags/Web Beacons, and Other Technologies.
            </span>{" "}
            We, as well as third parties that provide content, advertising, or
            other functionality on our Services, may use cookies, pixel tags,
            local storage, and other technologies (“Technologies”) to
            automatically collect information through your use of our Services.{" "}
            <br />
            Cookies. Cookies are small text files placed in device browsers that
            store preferences and facilitate and enhance your experience.
            <br />
            <br />
            Pixel Tags/Web Beacons. A pixel tag (also known as a web beacon) is
            a piece of code embedded in our Services that collects information
            about engagement on our Services. The use of a pixel tag allows us
            to record, for example, that a user has visited a particular web
            page or clicked on a particular advertisement. We may also include
            web beacons in e-mails to understand whether messages have been
            opened, acted on, or forwarded.
            <br />
            <br />
            Our uses of these Technologies fall into the following general
            categories: <br />
            Operationally Necessary. This includes Technologies that allow you
            access to our Services, applications, and tools that are required to
            identify irregular website behavior, prevent fraudulent activity,
            improve security, or allow you to make use of our functionality;
            <br />
            Performance-Related. We may use Technologies to assess the
            performance of our Services, including as part of our analytic
            practices to help us understand how individuals use our Services
            (see Analytics below);
            <br />
            Functionality-Related. We may use Technologies that allow us to
            offer you enhanced functionality when accessing or using our
            Services. This may include identifying you when you sign into our
            Services or keeping track of your specified preferences, interests,
            or past items viewed;
            <br />
            Advertising- or Targeting-Related. We may use first party or
            third-party Technologies to deliver content, including ads relevant
            to your interests, on our Services or on third-party websites.
            <br />
            <br />
            See “Your Privacy Choices and Rights” below to understand your
            choices regarding these Technologies.
            <br />
            <span className="font-bold">- Analytics.</span> We may use our
            Technologies and other third-party tools to process analytics
            information on our Services. These technologies allow us to process
            usage data to better understand how our website and web-related
            Services are used, and to continually improve and personalize our
            Services. Some of our analytics partners include: <br />
            Google Analytics. For more information about how Google uses your
            data (including for its own purposes, e.g., for profiling or linking
            it to other data), please visit Google Analytics’ Privacy Policy. To
            learn more about how to opt-out of Google Analytics’ use of your
            information, please click here. <br />
            LinkedIn Analytics. For more information, please visit LinkedIn
            Analytics’ Privacy Policy. To learn more about how to opt-out of
            LinkedIn’s use of your information, please click here.
            <br />
            Facebook Connect. For more information, please visit Facebook’s Data
            Policy. You can object to the collection of your data by Facebook
            pixel, or to the use of your data for the purpose of displaying
            Facebook ads by contacting the following address while logged into
            your Facebook account: https://www.facebook.com/settings?tab=ads.
            <br />
            Mixpanel. For more information about Mixpanel, please visit
            Mixpanel’s Privacy Policy. <br />
            Social Media Platforms. Our Services may contain social media
            buttons, such as Discord, Twitter, Instagram, TikTok, Youtube, and
            Telegram, which might include widgets such as the “share this”
            button or other interactive mini programs. These features may
            collect your IP address and which page you are visiting on our
            Services and may set a cookie to enable the feature to function
            properly. Your interactions with these platforms are governed by the
            privacy policy of the company providing it.
            <br />
            <br />
            <span className="font-bold text-black">
              C. Information Collected from Other Sources
            </span>
            <br />
            <br />
            Third-Party Sources. We may obtain information about you from other
            sources, including through third-party services and organizations.
            For example, if you access our Services through a third-party
            application, such as an app store, a third-party login service, or a
            social networking site, we may collect information about you from
            that third-party application that you have made available via your
            privacy settings.
            <br />
            <br />
            Referrals, Sharing and Other Features. Our Services may offer
            various tools and functionalities that allow you to provide
            information about your friends through our referral service; third
            parties may also use these services to upload information about you.
            Our referral services may also allow you to forward or share certain
            content with a friend or colleague, such as an email inviting your
            friend to use our Services. Please only share with us contact
            information of people with whom you have a relationship (e.g.,
            relative, friend, neighbor, or co-worker).
          </section>
          <br />
          <section id="how_we_use_your_information">
            <h2 className="text-2xl font-semibold text-left mb-4">
              4. HOW WE USE YOUR INFORMATION
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              We use your information for a variety of business purposes,
              including to provide our Services, for administrative purposes,
              and to market our products and Services, as described below.
              <br /> <br />
              <span className="font-bold text-black">
                A. Provide Our Services
              </span>
              <br />
              <br />
              We use your information to fulfill our contract with you and
              provide you with our Services and perform our contract with you,
              such as:
              <br />- Managing your information and accounts;
              <br />- Providing access to certain areas, functionalities, and
              features of our Services;
              <br />- Answering requests for customer or technical support;
              <br />- Communicating with you about your account, activities on
              our Services, and policy changes;
              <br />- Processing information about your wallet to facilitate
              transfers via the Services;
              <br />- Processing applications if you apply for a job, we post on
              our Services; and
              <br />- Allowing you to register for events.
              <br />
              <br />
              <span className="font-bold text-black">
                B. Administrative Purposes
              </span>
              <br />
              <br />
              We use your information for our legitimate interest, such as:
              <br />- Pursuing our legitimate interests such as direct
              marketing, research and development (including marketing
              research), network and information security, and fraud prevention;
              <br />- Detecting security incidents, protecting against
              malicious, deceptive, fraudulent or illegal activity, and
              prosecuting those responsible for that activity;
              <br />- Measuring interest and engagement in our Services;
              <br />- Improving, upgrading or enhancing our Services;
              <br />- Developing new products and Services;
              <br />- Ensuring internal quality control and safety;
              <br />- Authenticating and verifying individual identities;
              <br />- Debugging to identify and repair errors with our Services;
              <br />- Auditing relating to interactions, transfers and other
              compliance activities;
              <br />- Sharing information with third parties as needed to
              provide the Services;
              <br />- Enforcing our agreements and policies; and
              <br />- Other uses as required to comply with our legal
              obligations.
              <br />
              <br />{" "}
              <span className="font-bold text-black">
                C. Marketing and Advertising our Products and Services
              </span>
              <br />
              <br />
              We may use personal information to tailor and provide you with
              content and advertisements. We may provide you with these
              materials as permitted by applicable law. Some of the ways we may
              market to you include email campaigns, custom audiences
              advertising, and “interest-based” or “personalized advertising,”
              including through cross-device tracking.
              <br />
              If you have any questions about our marketing practices or if you
              would like to opt out of the use of your personal information for
              marketing purposes, you may contact us at any time as set forth in
              “Contact Us” below.
              <br />
              <br />
              <span className="font-bold text-black">D. With Your Consent</span>
              <br />
              <br />
              We may use personal information for other purposes that are
              clearly disclosed to you at the time you provide personal
              information or with your consent.
              <br />
              <br />
              <span className="font-bold text-black">
                E. Other Purposes
              </span>{" "}
              <br />
              <br />
              We also use your information for other purposes as requested by
              you or as permitted by applicable law.
              <br />- Automated Decision Making. We may engage in automated
              decision making, including profiling. Mysten Labs’s processing of
              your personal information will not result in a decision based
              solely on automated processing that significantly affects you
              unless such a decision is necessary as part of a contract we have
              with you, we have your consent, or we are permitted by law to
              engage in such automated decision making. If you have questions
              about our automated decision making, you may contact us as set
              forth in “Contact Us” below.
              <br />- De-identified and Aggregated Information. We may use
              personal information and other information about you to create
              de-identified and/or aggregated information, such as de-identified
              demographic information, de-identified location information,
              information about the device from which you access our Services,
              or other analyses we create.
            </p>
          </section>

          <section id="how_we_disclose_your_information">
            <h2 className="text-2xl font-semibold text-left mb-4">
              5. HOW WE DISCLOSE YOUR INFORMATION
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              We disclose your information to third parties for a variety of
              business purposes, including to provide our Services, to protect
              us or others, or in the event of a major business transaction such
              as a merger, sale, or asset transfer, as described below.
              <br />
              <br />
              <span className="font-bold text-black">
                A. Disclosures to Provide our Services
              </span>
              <br />
              <br />
              The categories of third parties with whom we may share your
              information are described below.
              <br />- Notice Regarding Use of Blockchain. Transactions on the
              Services will be conducted via Blockchain. Information about your
              transfers will be provided to a Blockchain and may be accessible
              to third parties due to the public nature of the Blockchain.
              Because entries to a Blockchain are, by their nature, public, and
              because it may be possible for someone to identify you through
              your pseudonymous, public wallet address using external sources of
              information, any transaction you enter onto the Blockchain could
              possibly be used to identify you, or information about you.
              <br />- Other Users of the Services and Parties You Transact With.
              Some of your personal information may be visible to other users of
              the Services (e.g., information featured on generally accessible
              parts of your profile; usernames of other Mysten Labs Services
              users). In addition, to complete transfers via the Services, we
              will need to share some of your personal information with the
              party that you are transacting with.
              <br />- Third Party Websites and Applications. You may choose to
              share personal information or interact with third-party websites
              and/or third-party applications, including, but not limited to,
              third-party electronic wallet extensions. Once your personal
              information has been shared with a third-party website or a
              third-party application, it will also be subject to such third
              party’s privacy policy. We encourage you to closely read each
              third-party website or third-party application privacy policy
              before sharing your personal information or otherwise interacting
              with them. Please note that we do not control, and we are not
              responsible for the third-party website’s or the third-party
              application’s processing of your personal information.
              <br />- Service Providers. We may share your personal information
              with our third-party service providers who use that information to
              help us provide our Services. This includes service providers that
              provide us with IT support, hosting, customer service, and related
              services.
              <br />- Business Partners. We may share your personal information
              with business partners to provide you with a product or service
              you have requested. We may also share your personal information to
              business partners with whom we jointly offer products or services.
              <br />- Affiliates. We may share your personal information with
              members of our corporate family.
              <br />- Other Users/Website Visitors. As described above in
              “Personal Information We Collect,” our Services allow you to share
              your profile and/or User Content with other users or publicly,
              including to those who do not use our Services.
              <br />- Advertising Partners. We may share your personal
              information with third-party advertising partners. These
              third-party advertising partners may set Technologies and other
              tracking tools on our Services to collect information regarding
              your activities and your device (e.g., your IP address, cookie
              identifiers, page(s) visited, location, time of day). These
              advertising partners may use this information (and similar
              information collected from other services) for purposes of
              delivering personalized advertisements to you when you visit
              digital properties within their networks. This practice is
              commonly referred to as “interest-based advertising” or
              “personalized advertising.”
              <br />- APIs/SDKs. We may use third-party application program
              interfaces (“APIs”) and software development kits (“SDKs”) as part
              of the functionality of our Services. For more information about
              our use of APIs and SDKs, please contact us as set forth in
              “Contact Us” below.
              <br />
              <br />
              <br />
              <span className="font-bold text-black">
                B. Disclosures to Protect Us or Others
              </span>
              <br />
              <br />
              We may access, preserve, and disclose any information we store
              associated with you to external parties if we, in good faith,
              believe doing so is required or appropriate to: comply with law
              enforcement or national security requests and legal process, such
              as a court order or subpoena; protect your, our, or others’
              rights, property, or safety; enforce our policies or contracts;
              collect amounts owed to us; or assist with an investigation or
              prosecution of suspected or actual illegal activity.
              <br />
              <br />
              <br />
              <span className="font-bold text-black">
                C. Disclosure in the Event of Merger, Sale, or Other Asset
                Transfers
              </span>
              <br />
              <br />
              If we are involved in a merger, acquisition, financing due
              diligence, reorganization, bankruptcy, receivership, purchase or
              sale of assets, or transition of service to another provider, your
              information may be sold or transferred as part of such a
              transaction, as permitted by law and/or
            </p>
          </section>

          <section id="your_privacy_choices_and_rights">
            <h2 className="text-2xl font-semibold text-left mb-4">
              6. YOUR PRIVACY CHOICES AND RIGHTS
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              <br />
              <span className="font-bold">Your Privacy Choices.</span> The
              privacy choices you may have about your personal information are
              determined by applicable law and are described below.
              <br />- Email Communications. If you receive an unwanted email
              from us, you can use the unsubscribe link found at the bottom of
              the email to opt out of receiving future emails. Note that you
              will continue to receive transfer-related emails regarding
              Services you have requested. We may also send you certain
              non-promotional communications regarding us and our Services, and
              you will not be able to opt out of those communications (e.g.,
              communications regarding our Services or updates to our Terms of
              Service or this Privacy Policy).
              <br />- Text Messages. You may opt out of receiving text messages
              from us by following the instructions in the text message you have
              received from us or by otherwise contacting us.
              <br />- Mobile Devices. We may send you push notifications through
              our mobile application. You may opt out from receiving these push
              notifications by changing the settings on your mobile device. With
              your consent, we may also collect precise location-based
              information via our mobile application. You may opt out of this
              collection by changing the settings on your mobile device.
              <br />- “Do Not Track.” Do Not Track (“DNT”) is a privacy
              preference that users can set in certain web browsers. Please note
              that we do not respond to or honor DNT signals or similar
              mechanisms transmitted by web browsers.
              <br />- Cookies and Interest-Based Advertising. You may stop or
              restrict the placement of Technologies on your device or remove
              them by adjusting your preferences as your browser or device
              permits. However, if you adjust your preferences, our Services may
              not work properly. Please note that cookie-based opt-outs are not
              effective on mobile applications. However, you may opt-out of
              personalized advertisements on some mobile applications by
              following the instructions for Android, iOS and others. The online
              advertising industry also provides websites from which you may opt
              out of receiving targeted ads from data partners and other
              advertising partners that participate in self-regulatory programs.
              You can access these and learn more about targeted advertising and
              consumer choice and privacy by visiting the Network Advertising
              Initiative, the Digital Advertising Alliance, the European Digital
              Advertising Alliance, and the Digital Advertising Alliance of
              Canada. Please note you must separately opt out in each browser
              and on each device.
              <br />
              <br />
              <span className="font-bold">Your Privacy Rights.</span> In
              accordance with applicable law, you may have the right to:
              <br />
              -Access Personal Information about you, including: (i) confirming
              whether we are processing your personal information; (ii)
              obtaining access to or a copy of your personal information; or
              (iii) receiving an electronic copy of personal information that
              you have provided to us, or asking us to send that information to
              another company (aka the right of data portability);
              <br />
              -Request Correction of your personal information where it is
              inaccurate or incomplete. In some cases, we may provide
              self-service tools that enable you to update your personal
              information;
              <br />
              -Request Deletion of your personal information;
              <br />
              -Request Restriction of or Object to our processing of your
              personal information, including where the processing of your
              personal information is based on our legitimate interest or for
              direct marketing purposes; and
              <br />
              -Withdraw Your Consent to our processing of your personal
              information. Please note that your withdrawal will only take
              effect for future processing and will not affect the lawfulness of
              processing before the withdrawal.
              <br />
              If you would like to exercise any of these rights, please contact
              us as set forth in “Contact Us” below. We will process such
              requests in accordance with applicable laws.
            </p>
          </section>

          <section id="security_of_your_information">
            <h2 className="text-2xl font-semibold text-left mb-4">
              7. SECURITY OF YOUR INFORMATION
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              We take steps designed to ensure that your information is treated
              securely and in accordance with this Privacy Policy.
              Unfortunately, no system is 100% secure, and we cannot ensure or
              warrant the security of any information you provide to us. To the
              fullest extent permitted by applicable law, we do not accept
              liability for unauthorized disclosure. By using our Services or
              providing personal information to us, you agree that we may
              communicate with you electronically regarding security, privacy,
              and administrative issues relating to your use of our Services. If
              we learn of a security system’s breach, we may attempt to notify
              you electronically by posting a notice on our Services, by mail or
              by sending an email to you.
            </p>
          </section>

          <section id="international_data_transfers">
            <h2 className="text-2xl font-semibold text-left mb-4">
              8. INTERNATIONAL DATA TRANSFERS
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              All information processed by us may be transferred, processed, and
              stored anywhere in the world, including, but not limited to, the
              United States or other countries, which may have data protection
              laws that are different from the laws where you live. We endeavor
              to safeguard your information consistent with the requirements of
              applicable laws. If we transfer personal information which
              originates in the European Economic Area, Switzerland, and/or the
              United Kingdom to a country that has not been found to provide an
              adequate level of protection under applicable data protection
              laws, one of the safeguards we may use to support such transfer is
              the EU Standard Contractual Clauses.
            </p>
          </section>

          <section id="retention_of_personal_information">
            <h2 className="text-2xl font-semibold text-left mb-4">
              9. RETENTION OF PERSONAL INFORMATION
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              We store the personal information we collect as described in this
              Privacy Policy for as long as you use our Services or as necessary
              to fulfill the purpose(s) for which it was collected, provide our
              Services, resolve disputes, establish legal defenses, conduct
              audits, pursue legitimate business purposes, enforce our
              agreements, and comply with applicable laws. To determine the
              appropriate retention period for personal information, we may
              consider applicable legal requirements, the amount, nature, and
              sensitivity of the personal information, certain risk factors, the
              purposes for which we process your personal information, and
              whether we can achieve those purposes through other means.
            </p>
          </section>

          <section id="supplemental_notice_for_california_residents">
            <h2 className="text-2xl font-semibold text-left mb-4">
              10. SUPPLEMENTAL NOTICE FOR CALIFORNIA RESIDENTS
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              This Supplemental Notice for California Residents only applies to
              our processing of personal information that is subject to the
              California Consumer Privacy Act of 2018 (“CCPA”). Mysten Labs does
              not believe it is subject to the CCPA. That said, Mysten Labs
              provides this supplemental notice for purposes of transparency.
              The CCPA provides California residents with the right to know what
              categories of personal information Mysten Labs has collected about
              them and whether Mysten Labs disclosed that personal information
              for a business purpose (e.g., to a service provider) in the
              preceding twelve months. California residents can find this
              information below:
            </p>
            <table className="border-collapse border border-gray-300 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-4">
                    Category of Personal Information Collected by Mysten Labs
                  </th>
                  <th className="border border-gray-300 p-4">
                    Categories of Third Parties Personal Information is
                    Disclosed to for a Business Purpose
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-4">
                    <strong>Identifiers</strong>
                    <br />A real name, postal address, unique personal
                    identifier, online identifier, Internet Protocol address,
                    email address, account name, or other similar identifiers.
                  </td>
                  <td className="border border-gray-300 p-4">
                    <ul className="list-disc pl-5">
                      <li>Service providers</li>
                      <li>Third-party websites or applications</li>
                      <li>Blockchain networks</li>
                      <li>Other users or third parties you interact with</li>
                      <li>Advertising partners</li>
                      <li>Data analytics providers</li>
                      <li>Other users/public (alias only)</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">
                    <strong>
                      Personal information categories listed in Cal. Civ. Code §
                      1798.80(e)
                    </strong>
                    <br />A name, signature, Social Security number, address,
                    telephone number, passport number, driver’s license or state
                    identification card number, insurance policy number,
                    education, employment, employment history, bank account
                    number, credit card number, debit card number, or any other
                    financial information. Personal Information does not include
                    publicly available information that is lawfully made
                    available to the general public from federal, state, or
                    local government records. Note: Some personal information
                    included in this category may overlap with other categories.
                  </td>
                  <td className="border border-gray-300 p-4">
                    <ul className="list-disc pl-5">
                      <li>Service providers</li>
                      <li>
                        Third-party websites or applications (e.g., wallet
                        providers; third-party identity verification services)
                      </li>
                      <li>Blockchain networks</li>
                      <li>Other users or third parties you interact with</li>
                      <li>Data analytics providers</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">
                    <strong>
                      Protected classification characteristics under California
                      or federal law
                    </strong>
                    <br />
                    Age (40 years or older), race, color, ancestry, national
                    origin, citizenship, religion or creed, marital status,
                    medical condition, physical or mental disability, sex
                    (including gender, gender identity, gender expression,
                    pregnancy or childbirth and related medical conditions),
                    sexual orientation, veteran or military status, genetic
                    information (including familial genetic information).
                  </td>
                  <td className="border border-gray-300 p-4">
                    <ul className="list-disc pl-5">
                      <li>Service providers (recruitment context)</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">
                    <strong>Commercial information</strong>
                    <br />
                    Records of personal property, products or services
                    purchased, obtained, or considered, or other purchasing or
                    consuming histories or tendencies.
                  </td>
                  <td className="border border-gray-300 p-4">
                    <ul className="list-disc pl-5">
                      <li>Service providers</li>
                      <li>Blockchain networks</li>
                      <li>Data analytics providers</li>
                      <li>Other users or third parties you interact with</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">
                    <strong>
                      Internet or other electronic network activity
                    </strong>
                    <br />
                    Browsing history, search history, information on a
                    consumer’s interaction with an internet website,
                    application, or advertisement.
                  </td>
                  <td className="border border-gray-300 p-4">
                    <ul className="list-disc pl-5">
                      <li>Service providers</li>
                      <li>Blockchain networks</li>
                      <li>Data analytics providers</li>
                      <li>Other users or third parties you interact with</li>
                      <li>Advertising partners</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">
                    <strong>
                      Professional or employment-related information
                    </strong>
                    <br />
                    Current or past job history or performance evaluations.
                  </td>
                  <td className="border border-gray-300 p-4">
                    <ul className="list-disc pl-5">
                      <li>Service providers</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4">
                    <strong>
                      Inferences drawn from other personal information to create
                      a profile about a consumer
                    </strong>
                    <br />
                    Profile reflecting a consumer’s preferences,
                    characteristics, psychological trends, predispositions,
                    behavior, attitudes, intelligence, abilities, and aptitudes.
                  </td>
                  <td className="border border-gray-300 p-4">
                    <ul className="list-disc pl-5">
                      <li>Service providers</li>
                      <li>Data analytics providers</li>
                      <li>Advertising partners</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <p className="text-gray-600 mb-6 text-left">
              The categories of sources from which we collect personal
              information and our business and commercial purposes for using
              personal information are set forth in “Personal Information we
              Collect” and “How We Use of Your Information” above, respectively.
              <br />
              <br />
              “Sales” of Personal Information under the CCPA. For purposes of
              the CCPA, Mysten Labs does not “sell” personal information, nor do
              we have actual knowledge of any “sale” of personal information of
              minors under 16 years of age.
              <br />
              Additional Privacy Rights for California Residents
              <br />
              Non-Discrimination. California residents have the right not to
              receive discriminatory treatment by us for the exercise of their
              rights conferred by the CCPA.
              <br />
              Authorized Agent. Only you, or someone legally authorized to act
              on your behalf, may make a verifiable consumer request related to
              your personal information. To designate an authorized agent,
              please contact us as set forth in “Contact Us” below and provide
              written authorization signed by you and your designated agent.
              <br />
              Verification. To protect your privacy, we will take the following
              steps to verify your identity before fulfilling your request. When
              you make a request, we will ask you to provide sufficient
              information that allows us to reasonably verify you are the person
              about whom we collected personal information or an authorized
              representative, which may include confirming the email address
              associated with any personal information we have about you. If you
              are a California resident and would like to exercise any of your
              rights under the CCPA, please contact us as set forth in “Contact
              Us” below. We will process such requests in accordance with
              applicable laws.
              <br />
              Refer-a-Friend and Similar Incentive Programs. As described above
              in “How We Use Your Personal Information,” we may offer referral
              programs or other incentivized data collection programs. For
              example, we may offer incentives to you such as discounts or
              promotional items or credit in connection with these programs,
              wherein you provide your personal information in exchange for a
              reward, or provide personal information regarding your friends or
              colleagues (such as their email address) and receive rewards when
              they sign up to use our Services. (The referred party may also
              receive rewards for signing up via your referral.) These programs
              are entirely voluntary and allow us to grow our business and
              provide additional benefits to you. The value of your data to us
              depends on how you ultimately use our Services, whereas the value
              of the referred party’s data to us depends on whether the referred
              party ultimately becomes a user and uses our Services. Said value
              will be reflected in the incentive offered in connection with each
              program.
              <br />
              Accessibility. This Privacy Policy uses industry-standard
              technologies and was developed in line with the World Wide Web
              Consortium’s Web Content Accessibility Guidelines, version 2.1. If
              you wish to print this policy, please do so from your web browser
              or by saving the page as a PDF.
              <br />
              California Shine the Light. The California “Shine the Light” law
              permits users who are California residents to request and obtain
              from us once a year, free of charge, a list of the third parties
              to whom we have disclosed their personal information (if any) for
              their direct marketing purposes in the prior calendar year, as
              well as the type of personal information disclosed to those
              parties.
              <br />
              Right for minors to remove posted content. Where required by law,
              California residents under the age of 18 may request to have their
              posted content or information removed from the publicly viewable
              portions of the Services by contacting us directly as set forth in
              “Contact Us” below.
            </p>
          </section>

          <section id="supplemental_notice_for_nevada_residents">
            <h2 className="text-2xl font-semibold text-left mb-4">
              11. SUPPLEMENTAL NOTICE FOR NEVADA RESIDENTS
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              <p className="text-gray-600 mb-6 text-left">
                If you are a resident of Nevada, you have the right to opt-out
                of the sale of certain personal information to third parties who
                intend to license or sell that personal information. You can
                exercise this right by contacting us as set forth in “Contact
                Us” below with the subject line “Nevada Do Not Sell Request” and
                providing us with your name and the email address associated
                with your account. Please note that we do not currently sell
                your personal information as sales are defined in Nevada Revised
                Statutes Chapter 603A.
              </p>
            </p>
          </section>

          <section id="children_information">
            <h2 className="text-2xl font-semibold text-left mb-4">
              12. CHILDREN’S INFORMATION
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              The Services are not directed to children under 13 (or other age
              as required by local law), and we do not knowingly collect
              personal information from children. If you learn that your child
              has provided us with personal information without your consent,
              you may contact us as set forth in “Contact Us” below. If we learn
              that we have collected a child’s personal information in violation
              of applicable law, we will promptly take steps to delete such
              information.
            </p>
          </section>

          <section id="third_party_websites_applications">
            <h2 className="text-2xl font-semibold text-left mb-4">
              13. THIRD-PARTY’S WEBSITES/APPLICATIONS
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              The Services may contain links to other websites/applications
              (such as GitHub) and other websites/applications may reference or
              link to our Services. These third-party services are not
              controlled by us. We encourage our users to read the privacy
              policies of each website and application with which they interact.
              We do not endorse, screen or approve, and are not responsible for,
              the privacy practices or content of such other websites or
              applications. Providing personal information to third-party
              websites or applications is at your own risk.
            </p>
          </section>

          <section id="supervisory_authority">
            <h2 className="text-2xl font-semibold text-left mb-4">
              14. SUPERVISORY AUTHORITY
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              If you are located in the European Economic Area, Switzerland, the
              United Kingdom, or Brazil, you have the right to lodge a complaint
              with a supervisory authority if you believe our processing of your
              personal information violates applicable law.
            </p>
          </section>

          <section id="contact_us">
            <h2 className="text-2xl font-semibold text-left mb-4">
              15. CONTACT US
            </h2>
            <p className="text-gray-600 mb-6 text-left">
              If you have any questions about our privacy practices or this
              Privacy Policy, or to exercise your rights as detailed in this
              Privacy Policy, please contact us at:
              <br />
              <br />
              <br />
              Mysten Labs, Inc.
              <br />
              Attn: Privacy Group
              <br />
              379 University Ave, #200
              <br />
              Palo Alto, CA 94301
              <br />
              <a
                href="mailto:privacy@mystenlabs.com"
                className="text-blue-600 underline"
              >
                privacy@mystenlabs.com
              </a>
              <br />
              <a href="tel:+14083848237" className="text-blue-600 underline">
                +1 (408) 384-8237
              </a>
            </p>
          </section>

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

export default PrivacyPolicyPage;
