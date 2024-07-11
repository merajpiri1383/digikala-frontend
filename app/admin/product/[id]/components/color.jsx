"use client"

import { useEffect, useState } from "react";
import API, { handle401Error } from "../../../../../src/api";
import Loading from "../../../../components/loading";
import { Zoom } from "react-awesome-reveal";
import { useDispatch } from "react-redux";
import { productToggle } from "../../../../../src/reducers/product";


const ColorProduct = ({ product }) => {

    const [colors, setColors] = useState([]);
    const [value, setValue] = useState(0);
    const [showLoading, setShowLoading] = useState(true);
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await API.get("/product/color/").then((response) => {
                setColors(response.data);
                setTimeout(() => setShowLoading(false), 400);
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router);
            })
        })();

        
    }, [])

    const submitHandeler = async (e) => {
        e.preventDefault();
        setShowLoading(true);
        await API.post(`/product/${product.id}/color/${value}/`).then((response) => {
            dispatch(productToggle());
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            error.response.status === 401 && handle401Error(router);
        })
    };

    const deleteHandeler = async (id) => {
        setShowLoading(true);
        await API.delete(`/product/${product.id}/color/${id}/`).then((response) => {
            dispatch(productToggle());
            setTimeout(() => setShowLoading(false), 400);
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
                !showLoading && <form className="p-3 my-6" onSubmit={submitHandeler}>
                    <h3 className="text-2xl font-bold text-rose-500 text-right">رنگ ها</h3>
                    <div className="relative border rounded-lg p-1 my-6">
                        <p className="absolute -top-5 right-6 bg-white p-1 px-6 text-rose-500 text-lg font-semibold">رنگ</p>
                        <select className="p-2 w-full text-lg font-bold outline-none" defaultValue={value}
                            onChange={(e) => setValue(e.target.value)}>
                            {
                                colors[0] && colors.map((color, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={color.id}
                                            className={`my-2 text-right font-bold`}
                                            style={{ color: `#${color.hex}` }}>{color.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <button className="bg-rose-500 text-white text-lg font-bold rounded-lg p-2 w-48 hover:bg-rose-600">افزودن</button>
                </form>
            }
            {
                !showLoading && <div className="grid my-6 p-3 grid-cols-6 gap-3">
                    {
                        product.colors[0] && product.colors.map((color, index) => {
                            return (
                                <div key={index} className="col-span-1 text-center border grid grid-cols-2 p-1 rounded-lg">
                                    <div className="size-8 rounded-full col-span-1" style={{ backgroundColor: `#${color.hex}` }}></div>
                                    <button onClick={() => deleteHandeler(color.id)}
                                    className="bg-rose-500 text-white text-lg font-bold p-1 w-16 rounded-lg col-span-1">حذف</button>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}; export default ColorProduct;