import Dashboard_Navbar from "../components/Dashboard_Navbar"

const ExploreDashboard = () => {
    return (
        <div className="flex flex-col items-center bg-green-50 h-screen">
            <Dashboard_Navbar navbarShadow />
            <div className="flex flex-col items-center w-2/3 mt-40">
                <div className="flex w-full text-sm gap-8 m-auto">
                    
                </div>
            </div>
        </div>
    )
}

const ThemeCard = () => {
    return <div className="border-[1px] flex-grow border-gray-400 rounded-xl p-6 flex gap-3">
    <div className="h-8 w-8 border-[1px] border-gray-700 rounded-md">D</div>
    <div className="flex flex-col">
        <p className="font-medium">Thematic Exposure</p>
        <p>Built around a single theme</p>
    </div>
</div>
}
export default ExploreDashboard