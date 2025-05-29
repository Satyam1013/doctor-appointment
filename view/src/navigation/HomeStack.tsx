import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/UserProfile';
import ContactUsScreen from '../screens/ContactUsScreen';
import ConsultationOptionScreen from '../screens/ConsultationOptionScreen';
import AgeSelectionScreen from '../screens/AgeSelectionScreen';
import TeethIssueSelectionScreen from '../screens/TeethIssueSelectionScreen';
import ProblemDetailScreen from '../screens/ProblemDetailScreen';
import MedicalHistoryScreen from '../screens/MedicalHistoryScreen';
import GenderSelectionScreen from '../screens/GenderSelectionScreen';
import SmokingStatusScreen from '../screens/SmokingStatusScreen';
import AvailabilityScreen from '../screens/AvailabilityScreen';
import CheckoutSummaryScreen from '../screens/CheckoutSummaryScreen';
import EComScreen from '../screens/ECommerceScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import TeethTreatmentScreen from '../screens/TeethTreatmentScreen';
import TreatmentInfoScreen from '../screens/TreatmentInfo';
import FindTeethTypeScreen from '../screens/FindTeethTypeScreen';
import DoctorDetailsScreen from '../screens/TopDoctorsScreen';
import TransformationScreen from '../screens/TransformationScreen';
import TransformationBlogDetailsScreen from '../screens/TransformationBlogs';
import { withAppShell } from '../utils/AppShellWrapper';
import Centers from '../screens/CentersScreen';
import BlogScreen from '../screens/BlogScreen';
import AlignersForTeensScreen from '../screens/AlignersForTeens';
import MyDentAlignersScreen from '../screens/MydentAligners';
import CartScreen from '../screens/CartScreen';
import BookingSuccessScreen from '../screens/BookingSuccessScreen';
import ConsultationDetailsScreen from '../screens/ConsultationDetailsScreen';
import ConsultationBookedScreen from '../screens/ConsultationBookedScreen';
import FavProductScreen from '../screens/FavProductScreen';
import PaymentScreen from '../screens/CheckoutScreen';
// import ClinicMapScreen from '../screens/ClinicMapScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={withAppShell(HomeScreen)} />
      <Stack.Screen
        name="BookingSuccessScreen"
        component={withAppShell(BookingSuccessScreen)}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={withAppShell(PaymentScreen)}
      />
      <Stack.Screen
        name="ConsultationDetailsScreen"
        component={withAppShell(ConsultationDetailsScreen)}
      />
      <Stack.Screen
        name="ConsultationBookedScreen"
        component={withAppShell(ConsultationBookedScreen)}
      />
      <Stack.Screen name="CartScreen" component={withAppShell(CartScreen)} />
      <Stack.Screen name="BlogScreen" component={withAppShell(BlogScreen)} />
      <Stack.Screen name="Profile" component={withAppShell(ProfileScreen)} />
      <Stack.Screen
        name="ContactUs"
        component={withAppShell(ContactUsScreen)}
      />
      <Stack.Screen
        name="ConsultationOption"
        component={withAppShell(ConsultationOptionScreen)}
      />
      <Stack.Screen
        name="AgeSelection"
        component={withAppShell(AgeSelectionScreen)}
      />
      <Stack.Screen
        name="TeethIssueSelection"
        component={withAppShell(TeethIssueSelectionScreen)}
      />
      <Stack.Screen
        name="ProblemDetail"
        component={withAppShell(ProblemDetailScreen)}
      />
      <Stack.Screen name="Centers" component={withAppShell(Centers)} />
      <Stack.Screen
        name="MedicalHistory"
        component={withAppShell(MedicalHistoryScreen)}
      />
      <Stack.Screen
        name="GenderSelection"
        component={withAppShell(GenderSelectionScreen)}
      />
      <Stack.Screen
        name="SmokingStatus"
        component={withAppShell(SmokingStatusScreen)}
      />
      <Stack.Screen
        name="Availability"
        component={withAppShell(AvailabilityScreen)}
      />
      <Stack.Screen
        name="CheckoutSummary"
        component={withAppShell(CheckoutSummaryScreen)}
      />
      <Stack.Screen name="EComScreen" component={withAppShell(EComScreen)} />
      <Stack.Screen
        name="AlignersForTeensScreen"
        component={withAppShell(AlignersForTeensScreen)}
      />
      <Stack.Screen
        name="MyDentAlignersScreen"
        component={withAppShell(MyDentAlignersScreen)}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={withAppShell(ProductDetailScreen)}
      />
      <Stack.Screen
        name="TeethTreatmentScreen"
        component={withAppShell(TeethTreatmentScreen)}
      />
      <Stack.Screen
        name="TransformationScreen"
        component={withAppShell(TransformationScreen)}
      />
      <Stack.Screen
        name="TransformationBlogDetailsScreen"
        component={withAppShell(TransformationBlogDetailsScreen)}
      />
      {/* <Stack.Screen
        name="ClinicMap"
        component={withAppShell(ClinicMapScreen)}
      /> */}
      <Stack.Screen
        name="TreatmentInfoScreen"
        component={withAppShell(TreatmentInfoScreen)}
      />
      <Stack.Screen
        name="FindTeethTypeScreen"
        component={withAppShell(FindTeethTypeScreen)}
      />
      <Stack.Screen
        name="DoctorDetailsScreen"
        component={withAppShell(DoctorDetailsScreen)}
      />
      <Stack.Screen
        name="FavProductScreen"
        component={withAppShell(FavProductScreen)}
        options={{ title: 'Favorites' }}
      />
    </Stack.Navigator>
  );
}
