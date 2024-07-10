"use client"
import { useState, useEffect } from "react";
import API, { handle401Error } from "../../../../src/api";
import { useRouter } from "next/navigation";
import Loading from "../../../components/loading";
import { Zoom } from "react-awesome-reveal";

const AddColor = () => {


    const [showLoading, setShowLoading] = useState(true);
    const [data,setData] = useState({});
    const [colors,setColors] = useState([]);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => setShowLoading(false), 400);
    }, [])

    useEffect(() => {
        (async () => {
            await API.get("/product/color/").then((response) => {
                setColors(response.data);
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router);
            })
        })();
    },[showLoading])

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        await API.post("/product/color/",data).then((response) => {
            setTimeout(() => setShowLoading(false),400);
        }).catch((error) => {
            console.log(error.response.data);
            error.response.status === 401 && handle401Error(router);
        })
    };

    const deleteHandeler = async (id) => {
        setShowLoading(true);
        await API.delete(`/product/color/${id}/`).then((response) => {
            setTimeout(() => setShowLoading(false),400);
        }).catch((error) => {
            error.response.status === 401 && handle401Error(router);
        })
    }

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <div className="p-6 m-6 border rounded-lg">
                    <form method="post" onSubmit={submitHandeler}>
                        <h1 className="text-rose-500 text-right font-bold text-xl">افزودن رنگ</h1>
                        <div className="border rounded-lg relative p-1 my-6">
                            <p className="bg-white px-6 absolute -top-5 p-1 right-6 text-lg font-semibold text-rose-500" >نام</p>
                            <input
                                type="text"
                                required
                                onChange={(e) => setData({...data,name : e.target.value})}
                                className="p-2 w-full outline-none text-lg font-bold text-right"
                            />
                        </div>

                        <div className="border rounded-lg relative p-1 my-6">
                            <p className="bg-white px-6 absolute -top-5 p-1 right-6 text-lg font-semibold text-rose-500" >کد</p>
                            <input
                                type="text"
                                required
                                onChange={(e) => setData({...data,hex : e.target.value})}
                                className="p-2 w-full outline-none text-lg font-bold text-right"
                            />
                        </div>
                        <button type="submit"
                        className="bg-rose-500 text-white text-lg font-bold w-48 p-1 rounded-lg hover:bg-rose-600">
                        ذخیره
                        </button>
                    </form>
                    <div className="grid grid-cols-6 my-6 gap-3">
                        {
                            colors[0] && colors.map((color,index) => {
                                return (
                                    <Zoom duration={300} key={index}>
                                        <div 
                                        className="col-span-2 rounded-circle h-16 rounded-lg text-white
                                        items-center flex justify-center font-bold" 
                                        style={{backgroundColor:`#${color.hex}`}}>
                                            {color.name}
                                            <button type="button"
                                            onClick={() => deleteHandeler(color.id)}
                                            className="bg-rose-500 text-white p-1 rounded-lg absolute bottom-0 left-0">حذف</button>
                                        </div>
                                    </Zoom>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}; export default AddColor;