import { auth } from "@/auth";


export default async function ProfileInfo() {
    const session = await auth();

    return session ? (
        <div className=" bg-gray-101">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">My Profile</h1>
                <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-2">User Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <span className="font-semibold">ID:</span> {session?.user?.id}
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold">Name:</span> {session?.user?.name || "Not provided"}
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold">Email:</span> {session?.user?.email}
                        </div>
                        <div className="flex items-center">
                            {/* <span className="font-semibold">Email Verified:</span> {emailVerified ? "Yes" : "No"} */}
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold">Image:</span> {session?.user?.image || "Not provided"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className=" bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-center text-gray-700">You are not authenticated</p>
            </div>
        </div>
    );
}
