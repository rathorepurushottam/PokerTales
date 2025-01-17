import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import Header from "../common/Header";
import { colors } from "../theme/color";
import {
  AppText,
  EIGHTEEN,
  FORTEEN,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  MENUTEXT,
  TWELVE,
  WHITE,
} from "../common/AppText";
import LinearGradient from "react-native-linear-gradient";
import NavigationService from "../navigation/NavigationService";
import FastImage from "react-native-fast-image";
import { backIcon } from "../helper/image";
import { Logo, universalPaddingHorizontal } from "../theme/dimens";
import { Screen } from "react-native-screens";

const TermsOfUse = () => {
  return (
    <AppSafeAreaView>
      <LinearGradient
          colors={["#000000BD", "#0000005C", "#00000000", "#032146"]}
          style={[styles.header]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0 }}
        >
          <TouchableOpacity
            style={styles.arrowview}
            onPress={() => {
              NavigationService.goBack();
            }}
          >
            <FastImage
              style={styles.arrowIcon}
              resizeMode="contain"
              source={backIcon}
              // tintColor={tintColor ? tintColor : colors.white}
            />
          </TouchableOpacity>
      
            <AppText
              color={WHITE}
              type={EIGHTEEN}
              weight={INTER_MEDIUM}
              style={styles.title}
            >
              {'Terms of use and Service'}
            </AppText>
          
         
        </LinearGradient>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}
      >
        <View style={{ padding: 10 }}>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Before registering with us, please read the terms provided on our
            website carefully. These terms apply to all services on the website,
            as well as to the specific conditions and rules for particular
            offerings.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            PokerTales is an online platform operated by Pocket Kings Pvt. Ltd.
            (referred to as “PokerTales,” “we,” “us,” or “our”) that allows
            users (“you”) to play poker online with each other. These Terms and
            Conditions, along with our Privacy Policy, Responsible Gaming
            Policy, Fairplay Policy and various Game Rules (collectively
            referred to as “Platform Policies”), form a binding legal agreement
            between you and PokerTales. This agreement governs your visit,
            access, and use of the website, mobile applications, and related
            services (collectively referred to as “Services”). We reserve the
            right to review, update, or modify any part of the Platform Policies
            at our sole discretion. You are advised to stay informed about the
            latest versions of the Platform Policies. We will notify you of any
            material changes, and your continued use of the Services after such
            notification will constitute acceptance of the updated Platform
            Policies. This agreement must be read in its entirety and fully
            understood before you agree to the terms of use governing all
            relationships under this agreement. By agreeing to these terms, you
            acknowledge that you have read, understood, and accepted both the
            explicitly stated terms and conditions. All players are welcome to
            participate on the PokerTales platform. However, before opening an
            account on the PokerTales app or website, you must ensure that you
            are not located in a jurisdiction where online gaming is prohibited
            or considered unlawful, and that you are in compliance with all
            applicable legislation and regulations.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            // style={{ marginVertical: 10 }}
          >
            Definitions:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Applicable Law(s): All relevant legal rules, including laws,
            regulations, and court decisions, applicable to the individual in
            any jurisdiction.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Bank Account: A financial account with a bank or institution,
            including RBI-authorized wallets.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Banking Company: As defined in section 5(c) of the Banking
            Regulation Act, 1949.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Cash Games: Games with financial stakes set by participants,
            according to Game Rules.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Company: PokerTales and its subsidiaries, also known as "we," "us,"
            or "our."
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Game(s): Poker games on the PokerTales website, including various
            formats and variations.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            PokerTales Account: A user account for gameplay, deposits, and
            bonuses on PokerTales.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Rake: A fee percentage PokerTales deducts from the pot money based
            on the amount placed.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Refund: Reversal of payments (like Service Fees or buy-ins) to a
            User’s PokerTales Account.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Restricted States: Indian states where online Poker is legally
            prohibited.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Service Fee: A fee PokerTales charges for gameplay, also called
            "Commission" or "Platform Fee."
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Terms: The Terms of Service for using PokerTales.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Website: The PokerTales website and apps offering games in various
            formats.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Withdrawable Balance: Funds in the Withdrawable and Deposit
            Segments.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Withdrawal/Withdraw: Transferring the Withdrawable Balance to a
            user’s bank account.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Withdrawal Request: A user’s request to withdraw funds from
            PokerTales.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Withdrawable Segment: Part of the PokerTales Account where net
            winnings are credited.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            You: Refers to the user or player of PokerTales, also called "you,"
            "your," or "player."
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            1. Membership:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Membership on the PokerTales website is strictly limited to a single
            user and must not be considered a multi-user account. To gain
            membership on the PokerTales website, allowing the user to play
            games, use the software, or access any other products or services
            offered by PokerTales or its associates, the user must first
            register by providing accurate and current credentials. You agree to
            provide valid credentials and represent and warrant that you will
            not share these credentials or account details with any other
            person. In the event of such sharing, you agree to fully indemnify
            PokerTales and its affiliates from any resulting damage or injury.
            Registration alone does not guarantee membership. Membership is
            granted only after PokerTales or its representatives, in their sole
            discretion, deem it appropriate and notify you via email. The right
            to grant membership is entirely reserved by PokerTales and its
            representatives, and this membership can be terminated at any time
            with immediate notice, for any reason deemed fit by PokerTales. By
            agreeing to the terms of use, you consent to this. The server
            hosting the software and games is located in a strictly confidential
            and non-public area with access highly restricted both physically
            and virtually. Individuals authorized to access the server are
            prohibited from registering as users and therefore cannot become
            members. Such individuals are also not permitted to use the
            software, play games, or use any other products or services provided
            by PokerTales. Nothing in this agreement shall be construed as a
            charge for membership. These measures are in place to promote fair
            play
          </AppText>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            2. Who may use our service:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            2.1. Our Services are not intended for or available to individuals
            under the age of 18, or to those residing in or accessing the
            Platform from any of the Barred States. We reserve the right to
            manage access to Our Services at any time, in any State within
            India, and may update the list of Barred States as necessary.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            2.2. If You are under 18 years of age or reside in or are located in
            any of the Barred States, You are prohibited from accessing and
            using Our Services. Should You do so, You will be solely responsible
            for any legal consequences that may arise from such use. We reserve
            the right to request proof of age and geolocation at any point
            during Your access to Our Services to ensure that underage
            individuals or those in Barred States are not using the Service. We
            may restrict access to Our Services if We suspect that a user is
            underage and fails to provide valid proof of age or is located in a
            Barred State.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            2.3. If You are not legally eligible to engage in transactions in
            Indian Rupees through banking channels in India, or if You are
            accessing the Services from a Barred State, You are not permitted to
            participate in Cash Games or Tournaments on Our Services. If You
            violate this restriction, Your participation in Cash Games or
            Tournaments will be considered a breach of the Platform Policies,
            and You will not be entitled to any prizes won in such games.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            2.4. We reserve the right to terminate Your access to and use of the
            Services if We become aware or, at Our sole discretion, believe that
            Your use violates the Platform Policies.
          </AppText>
        </View>
        <View style={{ padding: 8 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            3. Usage of service:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            PokerTales lets you play poker online through a mobile app, which
            you can download from our website www.pokertales.com or the Apple
            App Store. Poker is a game of skill, meaning the outcome depends on
            your abilities, not luck. Because of this, playing poker is legal in
            most Indian states. When you use our Services or create a PokerTales
            account, we may collect, use, share with third parties, store, or
            process your information, including personal and sensitive details,
            to ensure you can use the Services smoothly. This process is
            governed by our Privacy Policy, which is an essential part of our
            Platform Policies. During registration, you need to verify your
            mobile number. We keep your information confidential and handle it
            according to our Privacy Policy. By registering with us, you agree
            to receive promotional and service messages from us and our partners
            via SMS, email, call, and push notifications about tournaments,
            offers, and discounts. You can opt out of these messages by emailing
            support@pokertales.com.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            You understand that participating in a game or tournament on our
            website does not guarantee you a prize. Winning depends on your
            skill compared to other players and the rules of the game or
            tournament. Your participation is voluntary and at your own risk. We
            are not responsible for any interruptions in your use of our
            Services due to issues like internet connectivity problems on your
            end, software or hardware setup errors on your device, or other
            factors beyond our control. Winnings, discounts, and prizes are
            unique to each player and cannot be transferred. If you try to
            transfer them, they will be forfeited at our discretion. If a game
            or tournament has started and you cannot play due to slow internet,
            faulty hardware, or other issues not caused by us, you are not
            entitled to a refund of any entry fees you paid. However, if a
            technical glitch occurs during a tournament, you will get a refund
            of your buy-in and rebuys. There will be no refunds for glitches
            during cash games. You agree to use your account on PokerTales only
            for playing games and handling transactions related to our services.
            You also agree not to post any offensive, indecent, or unsolicited
            content on our website, including advertisements or personal
            information. If you do, you will be responsible for any damage or
            loss caused to the Company or Website.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            4. User Registration and Account Creation:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            When you create an account with us, a default username is
            automatically generated. You can change or update this display name,
            which will serve as your identity ("Username") on the platform. Your
            chosen Username will be approved as long as it complies with these
            Terms. You are prohibited from creating or using multiple accounts
            on our platform. If we discover that a user has more than one
            account, we may take action by suspending all associated accounts
            Usernames must not be indecent, offensive, or unlawful. If a
            username violates intellectual property, reveals personal
            information, or suggests advertising or promotion, it may be
            rejected. You may only have one account on our website, which you
            must register using your real name, valid details, and age
            declaration as required at registration. You cannot share your
            account with anyone else or use someone else’s account. If you try
            to create more than one account or use another person’s account, we
            have the right to close all your accounts and ban you from using our
            services immediately. Make sure you understand the rules of the
            games available on the platform. You agree to follow the rules,
            which may change from time to time, at the Company’s discretion. The
            game rules are part of the terms and conditions and can be found on
            the website. If any rules are not clear, you should contact customer
            support for clarification. The Company’s interpretation and
            decisions will be final, and by accepting the terms and conditions,
            you agree to follow them. Sharing your password with others is
            strictly prohibited. PokerTales is not responsible if someone else
            accesses your account using your password. You are legally
            responsible for all activities on the website made from your
            account, whether or not you made them.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            5. Restrictions on the use of Our Services:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            5.1. You must not use our Services or any communication features
            provided by us to upload, share, or post content that:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Infringes on patents, trademarks, copyrights, or other proprietary
            rights;
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Belongs to someone else without proper authorization or rights to
            use it;
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Is defamatory, obscene, pornographic, paedophilic, or invades
            someone’s privacy, including bodily privacy;
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Harasses, insults, or discriminates based on gender, is racially
            or ethnically offensive, or libelous;
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Encourages or relates to money laundering, gambling, or is
            otherwise unlawful;
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Is harmful to children;
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Contains false or misleading information, deceives others about
            the origin of the message, or is intended to mislead or defraud;
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Impersonates another person or entity;
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Threatens the unity, integrity, security, or sovereignty of India,
            disrupts public order, incites criminal activities, or insults other
            nations;
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Contains viruses, malware, or any code designed to disrupt or harm
            computer systems;
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Solicits donations, chips, or any other form of assistance;
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Is objectionable, undesirable, or violates any applicable laws;
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Promotes competing services or products;
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Disparages PokerTales or its subsidiaries, affiliates, partners,
            sponsors, products, services, or websites in any manner.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            5.2. We reserve the right to immediately suspend your communication
            features without prior notice if we suspect that you are engaging in
            any prohibited activities outlined in Clause 5.1 or elsewhere in our
            Platform Policies. This may also lead to the suspension of your
            account. You are encouraged to report any abusive or malicious
            behavior by other users following the complaints procedure.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            5.3. You are prohibited from hosting, intercepting, emulating, or
            redirecting any communication protocols used by us, including by
            methods such as protocol emulation, reverse engineering, or
            modifying our Services.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            5.4. You are not allowed to frame our Services, add editorial
            comments, commercial content, or information to our Services, or
            alter, remove, or obscure any proprietary notices or labels.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            5.5. Our Services cannot be used for commercial purposes, such as in
            a cyber cafe, gaming center, network play over the internet, or by
            connecting to unauthorized servers that replicate our gaming
            experience.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            5.6. You may not buy, sell, trade, rent, lease, license, grant a
            security interest in, or transfer your Wallet, content, money,
            points, standings, rankings, ratings, or any other attributes
            associated with our Services.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            5.7. Fraudulent activities, such as using another person’s credit
            card, debit card, net-banking account or mobile phones to add cash
            to your Wallet, or accessing the Services through someone else’s
            Wallet, are strictly prohibited. If we detect or suspect such
            activities, we may terminate your Wallet and notify the appropriate
            authorities.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            5.8. You must not allow anyone else to access or use your account,
            nor should you use any external assistance to play the Games or
            engage in activities that violate the Platform Policies.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            5.9. You are prohibited from using our Services for illegal or
            restricted purposes, including laundering funds in your Wallet or
            deliberately losing money to specific players.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            6. KYC Verification:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            We require users to complete additional online document verification
            ("KYC") when making a withdrawal request on our Website/Application.
            As part of the KYC process, you need to upload documents showing
            your Permanent Account Number (PAN), address proof, and bank account
            details. These KYC documents must be uploaded directly through our
            Website/Application, as we do not accept submissions through any
            other methods.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            When uploading documents, please ensure that:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * The documents are valid.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * The documents are clear, legible, and in jpg, jpeg, or pdf format.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * The documents are not password-protected.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            KYC document validation may take up to one working day from the date
            of submission. We reserve the right to approve or reject the KYC
            documents at our discretion. You will receive notifications about
            your KYC verification status via your registered mobile number,
            email address, and on our Website/Application.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            Please note that PokerTales only accepts documents from Indian
            citizens, as it is an Indian gaming platform, and international
            documents are not accepted.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            7. TAXES:
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            7.1. TDS (Tax Deducted at Source) will be applied to all Net
            Winnings according to the rate prescribed by applicable laws under
            the Income Tax Act, 1961. The financial year runs from April 1 to
            March 31. A TDS rate of 30% will be deducted from Net Winnings at
            the time of withdrawal and at the end of the financial year on any
            remaining balance. For more details, refer to the TDS policy. Please
            note that TDS policies, limits, and rates may change according to
            applicable laws, and PokerTales reserves the right to update them as
            necessary. Our responsibility is limited to deducting TDS as
            required by law and providing you with a tax deduction certificate.
            We also reserve the right to verify your PAN periodically and to
            cancel any prize if your PAN is found to be inconsistent during our
            KYC verification process.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            7.2. Ensure that your PAN is linked with your Aadhaar, valid, and
            compliant with Income Tax laws. PokerTales is not responsible for
            providing TDS certificates or credits if your PAN becomes
            inoperative according to guidelines from the Income Tax authorities.
            We have no liability regarding your personal tax matters.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            8. Service Fee:
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            PokerTales charges a service fee for each cash game played on the
            website, which may vary based on the game type and may change over
            time. PokerTales reserves the right to set different service fees
            for various cash games or different fees for individual users at its
            discretion.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            9. GST:
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            Starting October 1, 2023, a GST of 28% will be applied to deposits,
            following the latest changes in Goods and Services Tax laws. If you
            need more information about the taxes, please contact us at
            support@pokertales.com.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            10. Suspension and Termination
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.1 Suspension and Termination: We may suspend or terminate your
            Pokertales Account if you violate our Platform Policies or breach
            our security. If this happens, your account may be immediately
            terminated, and any prizes, GameCash, promotional winnings, or funds
            may be forfeited.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.2 Effects of Termination: If we terminate your account, you will:
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.2.1 Be unable to use our services from the mobile number, PAN, or
            bank account linked to the terminated account.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.2.2 Be allowed to withdraw the remaining balance, subject to our
            Platform Policies.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.3 Actions for Security Breaches: If we find that you're violating
            our security or privacy rules, we may:
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.3.1 Restrict your access to our services indefinitely.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.3.2 Permanently terminate your Pokertales Account.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.3.3 Limit or block withdrawals.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.3.4 Seek compensation for damages and possibly take legal action.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.3.5 Ban you from re-registering with us and cancel any previous
            transactions.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.4 Unfair Gameplay Violations: If we suspect unfair gameplay:
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.4.1 We may investigate your account and gameplay for up to 30
            days. During this period, your funds will be frozen.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.4.2 If we find evidence of unfair gameplay, we may forfeit the
            involved funds or repay affected users.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.5 Cyber Fraud: If we are notified by authorities about cyber
            fraud or other fraudulent activities:
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.5.1 We may suspend your account and transfer any funds to an
            account directed by authorities.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.5.2 We may block all withdrawals from your account based on
            authority instructions.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            10.6 Discontinuation: You can stop using our services at any time by
            emailing us at support@pokertales.com. If you have a withdrawable
            balance, we will transfer it to you. For deposit balances, we will
            deduct GST from the deposit amount before transferring the remaining
            balance to your bank account.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            10.7 Verification: We may occasionally request proof of
            identification and address. If your account is restricted due to
            failed validation, it could take up to 7 working days to restore
            access after successful verification. If we are unable to contact
            you, we may terminate your account and refund any remaining
            withdrawable balance and deposit balance (minus GST). We are not
            responsible for any claims or losses resulting from such actions.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            11. Representations and Warranties
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            You confirm that:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * You are legally able and qualified to engage in transactions with
            other users and PokerTales.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Any information you provide to us, whether during registration or
            later, is correct, complete, and up-to-date. We are not responsible
            for any issues related to the accuracy of this information. We may
            ask you to verify this information and provide additional documents.
            If you fail to do so, we may restrict your access to our services.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * You will protect your account information, including your
            password. We will never ask you for your account password outside of
            the login process. You must not share your login details with
            anyone. We are not liable for any issues resulting from sharing your
            account information.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * You have the legal rights for any content you upload or share on
            our website, and this does not infringe on anyone else's
            intellectual property rights.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * You will use your PokerTales account only to play the games
            offered and not for illegal activities or money laundering.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Before adding money to your account or playing cash games, you are
            responsible for ensuring that playing these games is legal in your
            location.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * You have the experience and skills needed to play games on our
            platform and are not affected by any physical or mental condition
            that could impair your ability to fully participate.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Playing cash games may result in financial losses. By using our
            website/Application, you accept all risks and responsibilities
            associated with playing games, including any financial loss.
            PokerTales is not responsible for any financial loss you may incur.
            You agree to protect PokerTales and its team from any claims or
            costs related to your use of the website/Application.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Participating in a game does not guarantee that you will win a
            prize. Winning depends on the game’s outcome and your skill compared
            to other players, and is subject to our platform policies.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * PokerTales is not responsible for any issues that prevent you from
            accessing or playing games, including login problems, account
            validation issues, or policy violations.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            12. Promotional Program
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            PokerTales features Leaderboards as a promotional offer. Users can
            earn withdrawable chips based on their rankings in the Leaderboard
            for certain Cash Games on the PokerTales Platform. Leaderboard
            tables will be visible on the Platform, and joining one will
            automatically enroll you in the Leaderboard program. Each
            Leaderboard will be active for a limited period, with details about
            its duration available on the PokerTales Platform.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            13. Content:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            PokerTales may, at its discretion, offer bonuses, discounts (or
            Bonus Cash), or other promotions through various marketing
            strategies for games, tournaments, or contests on its
            website/platform. These bonuses or discounts are not guaranteed and
            cannot be claimed as a right by users. We reserve the right to use
            any content related to games played on the Platform, including
            gameplay recordings, for our corporate and marketing purposes. By
            using our services, you agree to and acknowledge this usage.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            14. Disclaimer, Indemnity, and Limitation of Liability:
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            14.1. PokerTales is not liable for any claims, losses, injuries,
            damages, expenses, or lost profits or winnings that you may incur
            while using our Services.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            14.2. Regardless of anything stated otherwise in these Terms, you
            agree that our total liability for all your claims against us,
            excluding valid withdrawals, is limited to the platform margin we
            received from you over the last three months. You are fully
            responsible for any consequences arising from your use of the
            Platform, and we do not accept liability for any financial losses
            you may incur.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            14.3. You agree to indemnify and hold PokerTales harmless from any
            claims, actions, suits, damages, penalties, or awards brought
            against us by any entity or individual in connection with your use
            of the Services.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            14.4. PokerTales offers the Platform on an "as-is" basis and makes
            no implied warranties about the Service. All implied warranties of
            merchantability and fitness for a particular purpose are disclaimed.
            Users should not rely on any warranties made outside of this
            agreement. However, if we are notified of an error in our Services,
            we will take prompt action to address it.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            14.5. PokerTales expressly disclaims any responsibility or liability
            for any harm, damages, or loss resulting from your participation in,
            or cancellation of, any game, any interactions or transactions with
            third parties connected through our Services, and any user-generated
            content, including any violations of intellectual property rights
            associated with such content.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            14.6. Our failure to strictly enforce any provision or exercise any
            right or remedy contained in these Terms does not constitute a
            waiver of those provisions, rights, or remedies. No waiver of any
            provision is valid unless it is in writing and signed.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            // style={{ marginVertical: 5 }}
          >
            14.7. The most current versions of the Platform Policies, as
            published on the Platform, represent the complete agreement between
            you and us regarding your access to and use of our Services,
            replacing all prior agreements, including earlier versions of the
            Platform Policies.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            15. Intellectual property:
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            15.1 PokerTales exclusively own all rights and intellectual property
            globally, including but not limited to patents, trademarks, domain
            names, trade names, service marks, copyrights, software, trade
            secrets, industrial designs, and know-how related to the Platform
            and Services, as well as the underlying technology and
            documentation.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            15.2 Upon successfully registering on the Platform, you are granted
            a limited right to use our Services in accordance with the Platform
            Policies. However, you do not have any rights, ownership, title, or
            interest in the intellectual property owned by PokerTales.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            16. Complaints and Disputes:
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            16.1. If you have any complaints or grievances related to our
            Services, you can contact our customer care and grievance redressal
            team by writing to support@pokertales.com for assistance.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            16.2. You agree to keep all complaints and disputes with PokerTales
            confidential. We will strive to resolve all grievances within a
            reasonable time frame, as required by applicable law. Any decision
            made by us regarding a complaint will be final and binding on the
            user.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            17. Governing Law, Dispute Resolution, and Jurisdiction:
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            17.2. Any disputes or claims related to these Platform Policies or
            our Services will be handled exclusively by the civil courts in New
            Delhi, India, unless stated otherwise in the arbitration section
            below.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            17.3. If you have a legal issue regarding the Platform Policies or
            our Services, you must provide written notice with details of the
            dispute. We will attempt to resolve the issue through discussion
            within thirty (30) days. If we cannot resolve it at that time, the
            matter may go to arbitration. The arbitration will be carried out by
            three (3) arbitrators: you and PokerTales will each choose one (1)
            arbitrator, and those two (2) will select the third. The arbitration
            will occur in New Delhi, India, in English, and follow the
            Arbitration and Conciliation Act, 1996. The arbitration decision
            will be final, with each party covering its own costs and sharing
            the arbitrator’s fees unless otherwise decided by the arbitrators.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            17.4. Even with the arbitration process, PokerTales can seek
            temporary or permanent relief from a court to protect its interests
            during a dispute. This does not affect the requirement for
            arbitration.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            18. Responsible Gaming:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            At PokerTales, we are committed to promoting responsible gaming and
            provide tools to help users manage their gaming habits, such as
            deposit limits, self-exclusion options, and session time limits.
            Users are encouraged to set these limits and seek help by contacting
            support@pokertales.com if they need assistance. We are dedicated to
            supporting users who may face gambling-related issues, and any
            concerning behavior may result in account suspension or termination,
            with remaining funds managed according to our policies.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            19. Unfair Gameplay:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            PokerTales is dedicated to maintaining game integrity and will not
            tolerate any form of manipulation or illegal activities. We will
            take all necessary actions against users involved in such practices.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            19.1. Chip Dumping: Chip dumping, where a player intentionally loses
            hands to transfer chips to another player, is strictly prohibited.
            Violations will result in penalties, account suspension, and
            potential legal action.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            19.2. Collusion: Collusion, which involves players working together
            or sharing hole cards to gain an unfair advantage, is not allowed.
            We may restrict seating, block accounts, and pursue legal action
            against those who collude.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            19.3. Multiple Accounts: Users are permitted to have only one
            PokerTales account. Creating or using multiple accounts is a breach
            of our rules and may lead to penalties, account closure, and legal
            consequences.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            19.4. IP Ghosting: Frequently changing IP addresses or geo-locations
            without authorization, known as IP ghosting, is forbidden. Such
            behavior will result in penalties, account suspension, and possible
            legal action.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            19.5. Software Modifications: Any modification, reverse-engineering,
            or disassembly of PokerTales software is prohibited. Such actions
            will lead to penalties, account termination, and legal consequences.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            19.6. External Programs & Bots: The use of external programs,
            artificial intelligence, or bots to gain an unfair advantage is
            strictly banned. Users found using these tools will face penalties,
            account suspension, and legal action.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            19.7. Offensive Language & Content: Posting unlawful, offensive, or
            defamatory content is prohibited. Offenders may receive warnings,
            temporary suspensions, or account closures.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            19.8. Disguised Identity: Impersonating others or providing false
            information during verification is not allowed. Misleading or
            inaccurate information may result in account blocking and legal
            action.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            19.9. Investigation Process: All cases of unfair activity will be
            investigated by PokerTales, which may take up to seven working days.
            The decisions made will be final and binding.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            19.10. Penalties for Violations: Depending on the severity of the
            violation, penalties may include deductions from funds/chips, access
            blocking, account seizure, or account termination.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            19.11. Legal Action: PokerTales reserves the right to pursue legal
            action against users involved in any form of unfair or illegal
            activity, in accordance with applicable laws.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            19.12. User Cooperation: Users must cooperate with PokerTales during
            investigations and provide any necessary information or assistance.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            19.13. Final Decisions: Decisions made following an investigation
            are final and binding. No further disputes or queries will be
            entertained after a decision is reached.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            20. Payments:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            All deposits and withdrawals made by players are maintained in an
            Escrow Account by PokerTales, which holds and dispatches funds to
            players upon withdrawal requests. The funds collected from players
            are held in trust in a separate, non-interest-bearing bank account
            managed by a third-party Trustee or Escrow Agent appointed by
            PokerTales. Only the amount generated via Rake is transferred from
            this Escrow Account to a separate account of PokerTales for
            receiving the Rake, with such transfers occurring every week.
            Additionally, payouts from these accounts may be made to users for
            their withdrawals, to PokerTales for its margin, or to governmental
            authorities for obligations such as GST and TDS on net winnings. You
            may withdraw all or part of your withdrawable balance to your bank
            account using an electronic bank-to-bank transfer or another
            preferred method in accordance with applicable laws. When initiating
            a withdrawal request, you must provide details of a bank account
            that belongs to you.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            20.1 Withdrawal Requests: Withdrawal requests are subject to
            successful KYC (Know Your Customer) verification, alignment with the
            original deposit method, adherence to any discount terms or
            restrictions, and security reviews conducted by our automated
            systems and risk management team. All withdrawals are governed by
            the following conditions:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Fees and Taxes: Withdrawals may incur applicable processing fees
            based on the chosen withdrawal method, as well as any applicable
            taxes.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Withdrawal Limits: You can withdraw a minimum of INR 100.00 (One
            Hundred Indian Rupees) and a maximum of INR 30,000 (Thirty Thousand
            Indian Rupees) per transaction. Payments will be made via electronic
            wire transfer or another method in accordance with your stated
            preferences and applicable laws. We also reserve the right to
            disburse funds to the same financial instrument or method used to
            add funds to your account. These withdrawal limits may be modified
            by us from time to time.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * KYC Verification: Withdrawal requests will be processed only after
            completing KYC verification. We may request your KYC documents at
            any stage to verify your address and identity.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Promotional Winnings: Discount and promotional winnings are not
            directly withdrawable and are subject to the terms and conditions
            under which they were granted.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Processing Delays: While we strive to process withdrawal requests
            promptly, delays may occur due to the time required for KYC
            verification, security checks, and other processes involved in
            completing the transaction. We are not liable for any compensation
            related to such delays.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Legal Compliance: Your winnings may be disclosed to relevant
            authorities, and necessary amounts may be withheld from payouts to
            ensure compliance with applicable laws and lawful requests from
            government entities, regulatory bodies, or court orders. It is
            solely your responsibility to ensure the timely remittance of all
            applicable taxes.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 5 }}
          >
            20.2 Deposits: All transactions with PokerTales must be conducted in
            Indian Rupees (INR). We do not accept deposits in any other currency
            or in the form of virtual digital assets. You may deposit funds into
            the Deposit Balance Segment to participate in Cash Games, subject to
            the following conditions:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Deposit Limits: You can deposit up to INR 5,00,000 (Five Lakhs
            Indian Rupees) in a single transaction. The monthly deposit limit is
            set by us and may be adjusted at our discretion with the necessary
            undertakings, indemnities, waivers, and verification conditions. We
            will inform you of any changes to these deposit limits on the
            platform.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * GST: Goods and Services Tax (GST) at the rates prescribed by the
            government will apply to the amount you deposit into the Deposit
            Balance Segment.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Purpose of Deposits: The funds you deposit into the Deposit
            Balance Segment are solely for the purpose of participating in Cash
            Games and do not generate any interest or returns. You may transfer
            the balance from the Deposit Balance Segment to the Game Balance
            Segment to participate in Cash Games.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * GST-Compliant Invoice: Upon depositing money into the Deposit
            Balance Segment, PokerTales will issue a GST-compliant invoice,
            which will be available for you to download from the platform.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Restrictions on Transfers: You cannot transfer funds from your
            Wallet to another user's Wallet under any circumstances.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Ownership of Payment Instrument: You represent and warrant that
            the payment instrument or method used to add cash to your Wallet
            belongs to you.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Payment Processing: Payments made via credit cards, debit cards,
            e-wallet and internet banking are processed through third-party
            payment gateways, and other payment methods also require
            authorization from the processing entity. We are not responsible for
            any delays or denials in processing payments by these third parties,
            as processing will be subject to their applicable policies and
            procedures, without any responsibility or risk on our part.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Responsibility for Payment Failures: We are not liable for delays
            or denials in crediting your account, and you must follow up with
            your payment instrument provider to resolve such issues. Once a
            payment is authorized, confirmed, and received by us, the amount is
            credited to the Deposit Balance Segment.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Right to Cancel Transactions: We reserve the right to cancel any
            transaction at our discretion. If a payment is successfully realized
            in such a case, the transaction will be reversed, and the money will
            be credited back (exclusive of GST) to the original payment source.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            21. RefundPolicy:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Deposits made on PokerTales are final and non-refundable. If a
            player requests a withdrawal of the deposited amount, 28% GST (Goods
            and Services Tax) will be deducted. Refund requests must be sent to
            support@pokertales.com with complete transaction details and will be
            reviewed within 7 business days. Approved refunds will be processed
            within 10 business days. PokerTales reserves the right to amend this
            policy.
          </AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppText
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            22. Cancellation Policy:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Once an account is created on PokerTales, it cannot be canceled or
            deleted by the user. However, users can request account deactivation
            by contacting support@pokertales.com. All account-related data will
            be managed as per our Privacy Policy. PokerTales reserves the right
            to amend this policy at any time.
          </AppText>
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default TermsOfUse;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
    },
    bottomContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      padding: universalPaddingHorizontal,
      position: 'absolute',
    },
    header: {
      flexDirection: 'row',
      height: 70,
      width: "100%",
      paddingHorizontal: 10,
    //  justifyContent: "space-between",
      // marginTop: 30,
      // paddingHorizontal: universalPaddingHorizontal,
      alignItems: "center",
    },
    logo: {
      alignSelf: 'center',
      marginTop: Screen.Height / 16,
      height: Logo.Height,
      width: Logo.Width,
    },
    title: {
      marginLeft: 60,
      marginTop:2,
      // alignSelf: "center"
    },
    balance: {
      marginLeft: 100,
      marginTop:2,
      // alignSelf: "center"
    },
    arrow: {
      height: 18,
      width: 18,
    },
    arrowIcon: {
      height: 24,
      width: 24,
    },
    walletIcon: {
      height: 18,
      width: 18,
    },
    arrowview:{
      height:38,
      width:38,
      marginTop:10,
    }
  });
  