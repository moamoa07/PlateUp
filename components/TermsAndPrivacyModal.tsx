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
          <View style={styles.modalButtonContainer}>
            <Text>
              <Text style={styles.modalHeading}>Terms of Use:</Text>
              {'\n\n'}
              <Text>
                Welcome to PlateUp! By accessing and using our app, you agree to
                comply with and be bound by the following terms and conditions.
                If you disagree with any part of these terms, please do not use
                our app.
              </Text>
              {'\n\n'}
              <Text style={styles.subheading}>User Conduct:</Text>
              {'\n\n'}
              Users are responsible for the content they post on PlateUp.
              Respect the rights and privacy of other users. Do not engage in
              any activities that violate local, state, or international laws.
              {'\n\n'}
              <Text style={styles.subheading}>Content Guidelines:</Text>
              {'\n\n'}
              Users should not post content that is offensive, discriminatory,
              or harmful. Respect copyright and intellectual property rights
              when sharing content.
              {'\n\n'}
              <Text style={styles.subheading}>Privacy:</Text>
              {'\n\n'}
              Your privacy is important to us. Please review our Privacy Policy
              to understand how we collect, use, and protect your personal
              information.
              {'\n\n'}
              <Text style={styles.subheading}>Account Security:</Text>
              {'\n\n'}
              Keep your login credentials confidential. Report any unauthorized
              access to your account.
              {'\n\n'}
              <Text style={styles.subheading}>Termination:</Text>
              {'\n\n'}
              PlateUp reserves the right to terminate accounts that violate our
              terms of use.
              {'\n\n'}
              <Text style={styles.modalHeading}>Privacy Policy:</Text>
              {'\n\n'}
              Your privacy is important to us. This Privacy Policy explains how
              PlateUp collects, uses, and protects your personal information.
              {'\n\n'}
              <Text style={styles.subheading}>Information We Collect:</Text>
              {'\n\n'}
              PlateUp collects information provided by users during account
              registration. We may collect data related to your app usage and
              interactions.
              {'\n\n'}
              <Text style={styles.subheading}>
                How We Use Your Information:
              </Text>
              {'\n\n'}
              Personal information is used to enhance your PlateUp experience.
              We may use aggregated data for analytics and app improvement.
              {'\n\n'}
              <Text style={styles.subheading}>Data Security:</Text>
              {'\n\n'}
              PlateUp employs measures to protect your data from unauthorized
              access. We use secure connections for data transmission.
              {'\n\n'}
              <Text style={styles.subheading}>Cookies:</Text>
              {'\n\n'}
              PlateUp uses cookies to enhance user experience. Users can manage
              cookie preferences in their app settings.
              {'\n\n'}
              <Text style={styles.subheading}>Third-Party Links:</Text>
              {'\n\n'}
              PlateUp may contain links to third-party websites. We are not
              responsible for their privacy practices.
              {'\n\n'}
              <Text style={styles.subheading}>Changes to Privacy Policy:</Text>
              {'\n\n'}
              PlateUp may update this Privacy Policy. Users will be notified of
              any significant changes.
              {'\n\n'}
              By using PlateUp, you agree to the terms outlined in this Privacy
              Policy.
            </Text>
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
    fontSize: 18,
    marginBottom: 40,
    marginTop: 20,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
    backgroundColor: 'pink',
  },
  subheading: {
    backgroundColor: 'lightblue',
  },
  modalButton: {
    borderRadius: 10,
  },
  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default TermsAndPrivacyModal;
