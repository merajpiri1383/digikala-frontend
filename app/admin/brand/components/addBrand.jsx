"use client"
import { useState, useEffect } from "react";
import Loading from "../../../components/loading";
import { Zoom } from "react-awesome-reveal";
import API, { handle401Error } from "../../../../src/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {toggleBrand} from "../../../../src/reducers/brand";

const addBrand = () => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const form = new FormData();
    const [showLoading, setShowLoaing] = useState(true);
    const router = useRouter();
    const dispacth = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setShowLoaing(false)
        }, 400);
    }, []);

    const submitHander  = async (e) => {
        e.preventDefault();
        setShowLoaing(true);
        name && form.append("name",name);
        image && form.append("image",image);
        await API.post("/category/brand/",form).then((response) => {
            dispacth(toggleBrand());
            setTimeout(() =>{
                setShowLoaing(false);
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
                !showLoading && <Zoom duration={400}>
                    <form method="post" className="border p-6 rounded-lg" onSubmit={submitHander}>
                        <h3 className="text-xl font-bold text-rose-500 text-right">افزودن برند</h3>
                        <div className="my-6 relative border rounded-lg">
                            <p className="text-rose-500 absolute text-lg font-semibold -top-4 right-6 px-6 bg-white">نام</p>
                            <input
                                type="text" required
                                onChange={(e) => setName(e.target.value)}
                                className="p-3 text-lg text-right w-full outline-none" />
                        </div>
                        <div className="my-6 relative border rounded-lg">
                            <p className="text-rose-500 absolute text-lg font-semibold -top-4 right-6 px-6 bg-white">تصویر</p>
                            <input
                                type="file" required
                                onChange={(e) => setImage(e.target.files[0])}
                                className="p-3 text-lg text-right w-full outline-none" />
                        </div>
                        <button className="text-white bg-rose-500 rounded-lg w-24 p-3 
                        font-semibold text-md hover:bg-rose-600">ذخیره</button>
                    </form>
                </Zoom>
            }
        </>
    )
}; export default addBrand;