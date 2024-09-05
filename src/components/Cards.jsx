import {
    ArrowPathRoundedSquareIcon,
    PencilIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
function Cards() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            <div className="flex items-center bg-white rounded-md shadow-md px-4 py-6">
                <div className="bg-indigo-600 rounded p-3">
                    <UserGroupIcon className="text-white h-6 w-6" />
                </div>
                <div className="mx-4">
                    <h4 className="text-2xl font-semibold text-gray-700">
                        100
                    </h4>
                    <p className="text-gr\">All Users</p>
                </div>
            </div>
            <div className="flex items-center bg-white rounded-md shadow-md px-4 py-6">
                <div className="bg-indigo-600 rounded p-3">
                    <PencilIcon className="text-white h-6 w-6" />
                </div>
                <div className="mx-4">
                    <h4 className="text-2xl font-semibold text-gray-700">30</h4>
                    <p className="text-gr\">All Blogs</p>
                </div>
            </div>
            <div className="flex items-center bg-white rounded-md shadow-md px-4 py-6">
                <div className="bg-indigo-600 rounded p-3">
                    <ArrowPathRoundedSquareIcon className="text-white h-6 w-6" />
                </div>
                <div className="mx-4">
                    <h4 className="text-2xl font-semibold text-gray-700">
                        1000
                    </h4>
                    <p className="text-gr\">All Transactions</p>
                </div>
            </div>
        </div>
    );
}
export default Cards;
