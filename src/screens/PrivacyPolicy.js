import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import Header from "../common/Header";
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
import { colors } from "../theme/color";
import LinearGradient from "react-native-linear-gradient";
import { Logo, universalPaddingHorizontal } from "../theme/dimens";
import { Screen } from "react-native-screens";
import { backIcon } from "../helper/image";
import FastImage from "react-native-fast-image";
import NavigationService from "../navigation/NavigationService";

const PrivatePolicy = () => {
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
              {'Private Policy'}
            </AppText>
          
         
        </LinearGradient>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}
      >
        <View style={{ padding: 8 }}>
          <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            We focus on the game, not on you!
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            At PokerTales, we take your privacy seriously and follow all the
            necessary data protection and privacy laws. We will not share,
            distribute, trade, sell, or rent your name, email address, or any
            other personal information provided on our platform with any third
            party, except as mentioned in this Privacy Policy.
          </AppText>
        </View>
        <View style={{ padding: 8 }}>
          <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            Information We Collect:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            To use the services on www.PokerTales.com, you need to provide a
            username, password, and email ID, along with some additional
            information. You have the choice to withhold or withdraw this extra
            information as per our Privacy Policy and Terms of Use. If you
            choose not to share this information or later decide to withdraw it,
            PokerTales may limit your access to the platform. Any withdrawal of
            consent should be sent in writing to support@pokertales.com.
          </AppText>
        </View>
        <View style={{ padding: 8 }}>
          <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            How We Collect Information:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            We gather personal information through online forms and when you
            email us your details. We also collect information about
            transactions you make on our platform, excluding payment card
            details. The personal information we collect may include your name,
            email address, home address, phone number, date of birth, and other
            details provided during registration or through surveys conducted by
            us or our partners. When you visitwww.PokerTales.com, we may
            automatically collect and store certain information, such as your
            computer's IP address, browser type and language, the date and time
            of your visit, and the website that linked you to ours. We do not
            log email addresses of visitors. Cookies may be stored on your
            computer when you visitwww.PokerTales.com. A cookie is a small text
            file that uniquely identifies your browser. These cookies may be
            used to personalize your experience, authenticate your login, manage
            games, and ensure security. Cookies may also be set by advertisers
            when you click on ads displayed on our platform. These cookies are
            controlled by the advertisers, not PokerTales. We do not store,
            capture, or monitor any personal or sensitive information from your
            device during your use of our platform. We also collect details
            about how you interact with our platform and other users.
            Additionally, we may collect information about your gameplay and
            account activity to detect any suspicious activities or violations
            of our policies.
          </AppText>
        </View>
        <View style={{ padding: 8 }}>
          <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            How We Use Collected Information
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Creating and managing player accounts.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            {" "}
            * Administering player accounts.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Providing and personalizing our services.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            {" "}
            * Responding to your inquiries and requests.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            {" "}
            * Notifying you about updates to our software and services.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Verifying the accuracy of information to meet our regulatory
            responsibilities.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Conducting audits and ensuring regulatory compliance, crime
            prevention, and prosecuting offenders.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Providing information and support for products and services.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Marketing our services or products.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Supporting any intended purposes stated when you provided personal
            information.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Conducting periodic analysis and surveys of traffic to
            PokerTales.com for market research and advertising purposes.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Ensuring compliance with our Platform Policies, including the Fair
            Play Policy and this Privacy Policy.
          </AppText>
        </View>
        <View style={{ padding: 8 }}>
          <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            Terms of Use of Collected Information:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            When you register your email address with PokerTales, you agree to
            receive emails from PokerTales and authorized entities. If you use
            our referral program, emails will be sent to the referred person on
            your behalf, with your email address in the header. Data transmitted
            over the internet carries inherent security risks. Information sent
            via chat or email can be compromised, and we cannot guarantee the
            security of such information. We strongly advise against sharing
            financial or sensitive information with other players. Your
            PokerTales account is protected by login information, including a
            username and password known only to you. You are responsible for
            keeping this information confidential. PokerTales is not responsible
            for any activity carried out using your password. If you suspect any
            security breach, including compromise of your login information, you
            must immediately notify PokerTales. PokerTales may contain links to
            other websites, which are governed by their own privacy policies. We
            do not control these sites, and it is your responsibility to read
            and understand their privacy policies when you follow a link
            outsidewww.PokerTales.com.
          </AppText>
        </View>
        <View style={{ padding: 8 }}>
          <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            Disclosure of Information: We may share your information with:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Companies within our group and their employees who need access to
            it.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            {" "}
            * Third-party service providers who enhance your gaming experience,
            such as payment processors and data verifiers.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Third-party operations service providers.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            {" "}
            * Auditors, contractors, or advisers who need access to information
            to advise us.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            {" "}
            * Third-party market research and advertising companies.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Any regulatory body or law enforcement authority with a valid
            reason to access personal information.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * Potential purchasers or investors.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * All communication with PokerTales personnel, including calls, may
            be recorded for compliance purposes.
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            * We may share personally identifiable information if it is
            necessary to comply with legal processes, governmental requests,
            enforce our Terms of Use and this Privacy Policy, prevent fraud,
            address information security issues, and protect your rights or
            those of PokerTales and the public.
          </AppText>
        </View>
        <View style={{ padding: 8 }}>
          <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            Security:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            We have implemented strict security measures to protect the
            information you provide us. These measures prevent unauthorized
            access, improper use or disclosure, unauthorized modification,
            unlawful destruction, or accidental loss. All employees and data
            processors with access to your information are obligated to respect
            your privacy.
          </AppText>
        </View>
        <View style={{ padding: 8 }}>
          <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            Mergers and Other Events Requiring Transfer:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            In the event of bankruptcy, insolvency, acquisition, merger, or sale
            of all or part of our assets, we may share personal and other
            information gathered through our services with potential
            stakeholders.
          </AppText>
        </View>
        <View style={{ padding: 8 }}>
          <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            Protection of Children:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            PokerTales services are not intended for or directed to minors. All
            players must provide documentation proving they are of legal age in
            their jurisdiction. We reserve the right to verify any personal
            information submitted by you. If we find any discrepancies related
            to age, we may deactivate the player profile and delete the
            information from our records.
          </AppText>
        </View>
        <View style={{ padding: 8 }}>
          <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            Winnings:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            Winnings and cash-outs are kept strictly confidential and stored
            securely. The only exception is when information is required by law,
            regulation, or any government or competent regulatory authority.
          </AppText>
        </View>
        <View style={{ padding: 8 }}>
          <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            Consent:
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            By using our website, you consent to the collection and use of the
            information you provide to PokerTales and its partners and
            affiliates. To play real money games, you will be required to send
            and receive money from us. We may use third-party electronic payment
            processors or financial institutions (ESPs) to process such
            transactions. By accepting this Privacy Policy, you consent to the
            disclosure of personal information necessary for processing
            transactions by ESPs. We take steps to ensure that our relationship
            with ESPs protects your privacy. We reserve the right to conduct a
            security review at any time to validate your identity, age,
            registration data, and verify your use of services and financial
            transactions for potential breaches of our Terms and Conditions and
            applicable law. By using our website, you authorize us, our
            employees, agents, and suppliers to use and disclose your personal
            information for these purposes. By providing your mobile number on
            our site, you give PokerTales the right to contact you via call or
            SMS to provide information on all promotional activities or events
            conducted by PokerTales and its partners. Your mobile number will
            not be used for any third-party communication. This Privacy Policy
            is here to help you understand how we collect, use, and protect your
            information to offer you gaming services. If you have any questions,
            please reach out to us at info@pokertales.com. This Privacy Policy
            is part of our Website Terms.
          </AppText>
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default PrivatePolicy;

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
      marginLeft: 100,
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
  
