import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase";
import { signOut, User, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { fetchEmissionsData } from "@/api/emissions";
import { EmissionsDocument } from "@/types/emissions";
import { LogOut, User as UserIcon, Calendar, Leaf, Trash2, Edit2 } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [emissionsData, setEmissionsData] = useState<EmissionsDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        navigate("/");
        return;
      }

      // Fetch user's current month emissions data
      try {
        const data = await fetchEmissionsData();
        setEmissionsData(data);
      } catch (error) {
        console.error("Error fetching emissions data:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleTakeCalculator = () => {
    navigate("/carbon-calculator");
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    setDeleteError("");
    setIsDeleting(true);

    try {
      // Check if user uses email/password auth
      const isEmailUser = user.providerData.some(
        (provider) => provider.providerId === "password"
      );

      if (isEmailUser) {
        // Require password for email/password users
        if (!deletePassword) {
          setDeleteError("Password is required to delete your account");
          setIsDeleting(false);
          return;
        }

        // Reauthenticate
        const credential = EmailAuthProvider.credential(
          user.email!,
          deletePassword
        );
        await reauthenticateWithCredential(user, credential);
      }

      // Delete the user
      await deleteUser(user);

      // Navigate to home
      navigate("/");
    } catch (error: any) {
      console.error("Error deleting account:", error);
      if (error.code === "auth/wrong-password") {
        setDeleteError("Incorrect password. Please try again.");
      } else if (error.code === "auth/requires-recent-login") {
        setDeleteError("Please sign out and sign in again before deleting your account.");
      } else {
        setDeleteError("Failed to delete account. Please try again.");
      }
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-blue-50">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <Navigation />

      <div className="container mx-auto px-4 py-12 relative z-10 mt-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          {/* Header with Default Avatar */}
          <motion.div variants={fadeUp} className="text-center mb-10">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center border-4 border-white shadow-lg">
                <UserIcon className="h-16 w-16 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-green-700 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                <Leaf className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              {user?.displayName || "Your Profile"}
            </h1>
            <p className="text-lg text-gray-600">
              Welcome back{user?.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}!
            </p>
          </motion.div>

          {/* Account Info Card */}
          <motion.div variants={fadeUp} className="mb-6">
            <Card className="shadow-xl border-2 border-green-100">
              <CardHeader>
                <CardTitle className="text-2xl">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{user?.email}</p>
                  </div>
                </div>
                {user?.displayName && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-semibold">{user.displayName}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Account Created</p>
                    <p className="font-semibold">
                      {user?.metadata.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Current Month Emissions Card */}
          <motion.div variants={fadeUp} className="mb-6">
            <Card className="shadow-xl border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  This Month's Carbon Footprint
                </CardTitle>
              </CardHeader>
              <CardContent>
                {emissionsData ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
                      <p className="text-3xl font-bold text-center text-gray-900">
                        {emissionsData.totalEmissions?.toFixed(2)} tons CO₂
                      </p>
                      <p className="text-center text-gray-600 mt-2">
                        Total annual emissions
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-600">Transportation</p>
                        <p className="text-xl font-bold text-gray-900">
                          {emissionsData.surveyEmissions?.transportationEmissions?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-600">Diet</p>
                        <p className="text-xl font-bold text-gray-900">
                          {emissionsData.surveyEmissions?.dietEmissions?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <p className="text-sm text-gray-600">Energy</p>
                        <p className="text-xl font-bold text-gray-900">
                          {emissionsData.surveyEmissions?.energyEmissions?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={handleTakeCalculator}
                      variant="outline"
                      size="lg"
                      className="w-full border-2 hover:border-green-500 hover:bg-green-50 font-semibold shadow-sm hover:shadow-md transition-all"
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Update Calculator
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                      You haven't calculated your carbon footprint this month yet.
                    </p>
                    <Button
                      onClick={handleTakeCalculator}
                      variant="hero"
                      size="lg"
                      className="font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      Take Carbon Calculator
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 font-semibold shadow-sm hover:shadow-md transition-all"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 font-semibold shadow-sm hover:shadow-md transition-all"
                >
                  <Trash2 className="mr-2 h-5 w-5" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl">Delete Account</AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    Are you sure you want to delete your account? This action cannot be undone.
                    All your data, including emissions history, will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                {user?.providerData.some((p) => p.providerId === "password") && (
                  <div className="space-y-2">
                    <Label htmlFor="delete-password">Confirm your password</Label>
                    <Input
                      id="delete-password"
                      type="password"
                      placeholder="Enter your password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      className="border-2"
                    />
                    {deleteError && (
                      <p className="text-sm text-red-600">{deleteError}</p>
                    )}
                  </div>
                )}

                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isDeleting ? "Deleting..." : "Delete Account"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
