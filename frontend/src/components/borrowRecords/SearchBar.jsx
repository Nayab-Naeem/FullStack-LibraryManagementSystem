import { Search } from "lucide-react";


function SearchBar({
    search,
    setSearch
}) {


    return (

        <div className="relative w-full md:w-96">

            <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
            />


            <input

            type="text"

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            placeholder="Search book or member..."

            className="w-full md:w-96 px-12 py-3 rounded-xl border border-[#D4A373] bg-white outline-none focus:ring-2 focus:ring-[#D4A373]"

            />

        </div>

    );

}


export default SearchBar;