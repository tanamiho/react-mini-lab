import Day00 from "./Day00";
import Day01 from "./Day01";


export const routes = [
    { path: "/", element: <Day00 /> },
    { path: "/day/00", element: <Day00 /> },
    { path: "/day/01", element: <Day01 /> },
];