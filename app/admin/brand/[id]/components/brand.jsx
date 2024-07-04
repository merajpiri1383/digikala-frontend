"use client"
import { useState, useEffect } from "react";
import API, { handle401Error } from "../../../../../src/api";
import { useRouter } from "next/navigation";
import Loading from "../../../../components/loading";
import { Zoom } from "react-awesome-reveal";
import { useParams } from "next/navigation";

const Brand = () => {

    const [showLoading, setShowLoading] = useState(true);
    const [data, setData] = useState({});
    const params = useParams();
    const router = useRouter();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const form = new FormData();

    useEffect(() => {
        setShowLoading(false);
        (async () => {
            await API.get(`/category/brand/${params.id}/`).then((response) => {
                setData(Object.assign({}, { ...response.data }));
                setTimeout(() => setShowLoading(false), 400);
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router);
            })
        })();
    });

    const submitHandeler = async (e) => {
        e.preventDefault();
        setShowLoading(true);
        name && form.append("name", name);
        image && form.append("image", image);
        await API.put(`/category/brand/${params.id}/`, form).then((response) => {
            setData(Object.assign({}, { ...response.data }));
            setTimeout(() => {
                setShowLoading(true);
            }, 400);
        }).catch((error) => {
            error.response.status === 401 && handle401Error(router);
        })

    };

    const deleteHandeler = async () => {
        await API.delete(`/category/brand/${params.id}/`, form).then((response) => {
            router.push("/admin/brand/");
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
                !showLoading && <Zoom duration={300}>
                    <form method="post" className="p-6 border my-6 rounded-lg grid grid-cols-12 gap-6" onSubmit={submitHandeler}>
                        <div className="col-span-4">
                            <img
                                src={data.image}
                                alt={data.name}
                                className="h-56 object-cover rounded-lg"
                            />
                        </div>
                        <div className="col-span-8">
                            <div className="border my-6 relative rounded-lg">
                                <p className="absolute -top-6 right-6 p-1 px-3 bg-white text-lg text-rose-500 font-semibold">نام</p>
                                <input
                                    type="text"
                                    placeholder={data.name}
                                    className="p-3 text-lg text-right w-full outline-none"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="border my-6 relative rounded-lg">
                                <p className="absolute -top-7 right-6 p-3 bg-white text-lg text-rose-500 font-semibold">تصویر</p>
                                <input
                                    type="file"
                                    className="p-3 text-lg text-right w-full outline-none "
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>

                            <div className="grid grid-cols-8">
                                <button
                                    className="bg-rose-500 text-white p-3 w-24 rounded-lg 
                                hover:bg-rose-600 text-lg font-semibold col-span-2"
                                    type="submit">ذخیره</button>
                                <button
                                    onClick={deleteHandeler}
                                    className="bg-rose-500 text-white p-3 w-24 rounded-lg 
                                hover:bg-rose-600 text-lg font-semibold col-span-2"
                                    type="button">حذف</button>
                            </div>
                        </div>
                    </form>
                </Zoom>
            }
        </>
    )
}; export default Brand;