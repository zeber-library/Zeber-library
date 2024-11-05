export default function Message({ element, index }) {
    return <div className="flex border-b-2 mb-6 items-baseline">
        <div>
            <div className="font-bold">{index}.&nbsp;</div>
        </div>
        <div className="ml-2">
            <div className="font-bold text-2xl mb-1">{element.message}</div>
            <div className="text-slate-600">{element.name}-{element.email}</div>
        </div>
    </div>
};