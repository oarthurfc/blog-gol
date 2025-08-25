import { strapiImage } from "@/lib/strapi/strapiImage";
import Image from "next/image";

type Props = {
    right_navbar_items: {
    id: string, 
    URL: string;
    text: string;
    target?: string;
  }[];
  logo: {
    url: string,
  }
};

export function Navbar({ data }: { data: Props | null }) {
    if (!data) return null;
    
    console.log("Data recebida no NavBar:" , data)
    return(
        <div className="flex flex-row items-center justify-center w-full bg-red-700 h-16 border-b-2 border-amber-300">

            <div className="flex flex-row justify-between w-full max-w-[1320px]">
                {data?.logo && (
                    <Image 
                        src={strapiImage(data.logo.url)} 
                        width={90} 
                        height={30} 
                        alt="Logo Gol a Gol"
                    />                
                )}

                
                {data?.right_navbar_items && data.right_navbar_items.length > 0 && (
                    <div className="flex flex-row">
                        <h1>Data recebida</h1>
                        {/* Renderize seus itens de navegação aqui */}
                        <ul>
                            {data.right_navbar_items.map((item) => (
                                <li key={item.id}>{item.text}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}