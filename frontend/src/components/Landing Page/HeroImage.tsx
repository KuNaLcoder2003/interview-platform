import type React from "react";
import { ContainerScroll } from "./ScrollConatiner";

const HeroImage: React.FC = () => {
    return (
        <div className="flex -mt-50 overflow-hidden">
            <ContainerScroll titleComponent={<></>}>
                <div className="">
                    <img src="https://framerusercontent.com/images/bwrnBJGQrVv3p54GisJaGc1r8.png?scale-down-to=2048" className="object-cover rounded-xl" />
                </div>
            </ContainerScroll>
        </div>
    )
}

export default HeroImage;