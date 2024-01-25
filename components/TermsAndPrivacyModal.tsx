import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';

interface TermsAndPrivacyModalProps {
  isVisible: boolean;
  hideModal: () => void;
}

function TermsAndPrivacyModal({
  isVisible,
  hideModal,
}: TermsAndPrivacyModalProps) {
  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
      >
        <ScrollView>
          <Text style={styles.modalTitleText}>
            Terms of Use & Privacy Policy
          </Text>
          <View style={styles.textContainer}>
            <View style={styles.textGroup}>
              <Text style={styles.modalHeading}>Terms of Use</Text>
              <Text style={styles.smallText}>
                Welcome to PlateUp! By accessing and using our app, you agree to
                comply with and be bound by the following terms and conditions.
                If you disagree with any part of these terms, please do not use
                our app.
              </Text>
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.subheading}>User Conduct</Text>
              <Text style={styles.smallText}>
                Users are responsible for the content they post on PlateUp.
                Respect the rights and privacy of other users. Do not engage in
                any activities that violate local, state, or international laws.
              </Text>
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.subheading}>Content Guidelines</Text>
              <Text style={styles.smallText}>
                Users should not post content that is offensive, discriminatory,
                or harmful. Respect copyright and intellectual property rights
                when sharing content.
              </Text>
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.subheading}>Privacy</Text>
              <Text style={styles.smallText}>
                Your privacy is important to us. Please review our Privacy
                Policy to understand how we collect, use, and protect your
                personal information. Feel free to contact us if you have any
                questions or concerns.
              </Text>
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.subheading}>Account Security</Text>
              <Text style={styles.smallText}>
                Keep your login credentials confidential. Report any
                unauthorized access to your account.
              </Text>
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.subheading}>Termination</Text>
              <Text style={styles.smallText}>
                PlateUp reserves the right to terminate accounts that violate
                our terms of use.
              </Text>
            </View>
            <View style={styles.textGroup}>
              <Text
                style={[
                  styles.modalHeading,
                  { marginTop: 20, marginBottom: 5 },
                ]}
              >
                Privacy Policy
              </Text>
              <Text style={styles.smallText}>
                Your privacy is important to us. This Privacy Policy explains
                how PlateUp collects, uses, and protects your personal
                information.
              </Text>
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.subheading}>Information We Collect</Text>
              <Text style={styles.smallText}>
                PlateUp collects information provided by users during account
                registration. We may collect data related to your app usage and
                interactions.
              </Text>
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.subheading}>How We Use Your Information</Text>
              <Text style={styles.smallText}>
                Personal information is used to enhance your PlateUp experience.
                We may use aggregated data for analytics and app improvement.
              </Text>
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.subheading}>Data Security</Text>
              <Text style={styles.smallText}>
                PlateUp employs measures to protect your data from unauthorized
                access. We use secure connections for data transmission.
              </Text>
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.subheading}>Cookies</Text>
              <Text style={styles.smallText}>
                PlateUp uses cookies to enhance user experience. Users can
                manage cookie preferences in their app settings.
              </Text>
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.subheading}>Third-Party Links</Text>
              <Text style={styles.smallText}>
                PlateUp may contain links to third-party websites. We are not
                responsible for their privacy practices.
              </Text>
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.subheading}>Changes to Privacy Policy</Text>
              <Text style={styles.smallText}>
                PlateUp may update this Privacy Policy. Users will be notified
                of any significant changes.
              </Text>
            </View>
            <View style={styles.textGroup}>
              <Text
                style={[
                  styles.modalHeading,
                  { marginTop: 20, marginBottom: 5 },
                ]}
              >
                GDPR
              </Text>
              <Text style={styles.smallText}>
                PlateUp is committed to complying with the General Data
                Protection Regulation (GDPR). As a user, you have the right to
                access, rectify, and erase your personal data. You can exercise
                these rights by contacting us through mailing us at
                contact@plateup.com
              </Text>
            </View>
            <Text
              style={[
                styles.smallText,
                { textAlign: 'center', marginTop: 30, fontWeight: 'bold' },
              ]}
            >
              By using PlateUp, you agree to the terms outlined in this Privacy
              Policy.
            </Text>
          </View>
          <View style={styles.modalButtonContainer}>
            <Button
              onPress={hideModal}
              mode="outlined"
              style={styles.modalButton}
            >
              Close
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  modalTitleText: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
  },
  textContainer: {
    display: 'flex',
    gap: 20,
  },
  textGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  modalHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  subheading: {
    fontSize: 15,
    fontWeight: '600',
  },
  smallText: {
    fontSize: 14,
  },
  modalButton: {
    borderRadius: 10,
  },
  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default TermsAndPrivacyModal;
