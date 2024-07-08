"use client"

import { useEffect, useState } from "react";
import API, { handle401Error } from "../../../src/api";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettings } from "../../../src/reducers/settings";
import Loading from "../../components/loading";


const Posters = () => {
    const [posters, setPosters] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const settingsToggle = useSelector((state) => state.settings.toggle);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        setShowLoading(true);
        (async () => {
            await API.get("/settings/poster/").then((response) => {
                setPosters(response.data);
                setTimeout(() => setShowLoading(false), 400);
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router);
            });
        })();

    }, [settingsToggle]);

    const deleteHandeler = async (id) => {
        setShowLoading(true);
        await API.delete(`/settings/poster/${id}/`).then((response) => {
            dispatch(toggleSettings());
            setTimeout(() => setShowLoading(false),400);
        }).catch((error) => {
            error.response.status === 401 && handle401Error(router);
        })
    };

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <div className="p-3 grid grid-cols-3 gap-3">
                    {
                        posters && posters.map((poster, index) => {
                            return (
                                <div key={index} className="col-span-1 relative">
                                    <img
                                        src={poster.image}
                                        className="object-cover rounded-lg h-40 hover:shadow-lg hover:scale-105 transition"
                                    />
                                    <button type="button" className="absolute bg-rose-500 hover:bg-rose-600 bottom-0 left-0
                            p-1 w-12 text-white rounded-md font-semibold" onClick={() => deleteHandeler(poster.id)}>حذف</button>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}; export default Posters;