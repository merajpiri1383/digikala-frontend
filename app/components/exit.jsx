"use client"

const Exit = ({self}) => {
    return (
        <div>
            <p className="text-right border-b p-2 text-lg font-semibold">از حساب کاربری خارج می‌شوید؟</p>
            <p className="text-right p-2 text-sm">با خروج از حساب کاربری، به سبد خرید فعلی‌تان دسترسی نخواهید داشت.
                 هروقت بخواهید می‌توانید مجددا وارد شوید و خریدتان را ادامه دهید.</p>
            <div className="grid grid-cols-10 gap-4">
                <button onClick={() => self.clickConfirm()}  className="bg-rose-500 text-white text-sm col-span-2 rounded-lg p-2 
                ">خروج ازحساب</button>
                <button onClick={() => self.close()} className="bg-white text-rose-500 border border-rose-500 text-sm col-span-2
                rounded-lg p-2">انصراف</button>
            </div>
        </div>
    )
};export default Exit;