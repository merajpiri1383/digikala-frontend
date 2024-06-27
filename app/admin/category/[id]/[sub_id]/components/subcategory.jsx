"use client"
import { useParams } from "next/navigation";
import API, { handle401Error } from "../../../../../../src/api";
import { useEffect, useState } from "react";
import Loading from "../../../../../components/loading";
import { Zoom } from "react-awesome-reveal";
import { useRouter } from "next/navigation";

const Subcategory = () => {

    const [data, setData] = useState({
        id: null ,
        name: null ,
        image: null ,
        category: null ,
        products: []
    });

    const params = useParams();
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [showLoading, setShowLoading] = useState(true);
    const form = new FormData();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            await API.get(`/category/sub-category/${params.sub_id}/`).then((response) => {
                setData(Object.assign({}, { ...data }, { ...response.data }));
                setTimeout(() => {
                    setShowLoading(false);
                }, 400)
            }).catch((error) => {
                console.log(error);
            })
        })()
    }, []);

    const submitHander = async (e) => {
        e.preventDefault();
        setShowLoading(true);
        name && form.append("name",name);
        file && form.append("image",file); 
        await API.put(`/category/sub-category/${params.sub_id}/`,form).then((response) => {
            setTimeout(() => {
                setShowLoading(false);
                setData(Object.assign({}, { ...data }, { ...response.data }));
            },400);
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
                !showLoading && <Zoom duration={200}>
                    <form 
                    onSubmit={submitHander}
                    className="grid grid-cols-12 gap-5 border border-gray-200 p-5 rounded-lg" 
                    method="file">
                        <div className="col-span-4">
                            <img
                                src={data.image}
                                alt={data.name}
                                className="rounded-md object-cover h-48"
                            />
                        </div>
                        <div className="col-span-8 grid grid-cols-1 gap-5">
                            <div className="col-span-1 border h-fit relative rounded-md">
                                <p className="absolute right-3 bg-white font-semibold -top-3 px-3 text-rose-500">نام دسته بندی</p>
                                <input
                                    type="text"
                                    className="outline-none w-full text-right p-2"
                                    placeholder={data.name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="col-span-1 border h-fit relative rounded-md">
                                <p className="absolute right-3 bg-white font-semibold -top-3 px-3 text-rose-500">تصویر</p>
                                <input
                                    type="file"
                                    className="outline-none w-full p-2"
                                    onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                            <button
                                type="submit"
                                className="text-white p-2 font-semibold bg-rose-500 rounded-md w-32 
                                hover:bg-rose-600">ذخیره</button>
                        </div>
                    </form>
                </Zoom>
            }
        </>
    )
}; export default Subcategory;