"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface CareerItem {
    id: number;
    Title: string;
    link: string;
    Image: {
        url: string;
    };
}

export function CareerSection() {
    const [careerData, setCareerData] = useState<CareerItem[]>([]);
    const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
    const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN; // Use API base URL from .env

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${apiToken}`);

        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect,
        };

        fetch(`${apiUrl}/api/career-instients?populate=*`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setCareerData(result.data);
            })
            .catch((error) => console.error("Error fetching career data:", error));
    }, [apiToken, apiUrl]);

    return (
        <div className="py-10 font-ubuntu relative sm:mt-0 flex flex-wrap justify-center gap-20">
            {careerData.map((item, index) => {
                // Determine the positioning class based on index
                const positionClasses = [
                    "sm:self-start mt-28 sm:ml-0", // West
                    "sm:self-center", // North
                    "sm:self-end sm:mr-0", // East
                    "sm:self-center " // South
                ];
                
                return (
                    <div 
                        key={item.id} 
                        className={`relative mb-14 sm:mb-14 w-full sm:w-[407px] ${positionClasses[index % 4]}`}
                    >
                      
                        {/* Background Underlap Image */}
                        <Image
                            src={`${item.Image.url}`}
                            alt="Career Background"
                            className="absolute top-[25%] sm:top-1/3 left-1/2 sm:left-[50%] w-full h-[300px] bg-gray-200 -translate-y-1/2 -translate-x-1/2 z-0 rounded-md"
                            width={407}
                            height={300}
                        />

                        {/* Card Component */}
                        <Card className="relative py-4 shadow-xl rounded-lg bg-white z-10 mt-28 w-[90%] mx-auto">
                            <CardContent>
                                <p className="text-2xl py-3 font-ubuntu font-extralight">
                                    {item.Title}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end sm:py-6 pb-6">
                                <Link href={`/careers/${item.link}`} passHref>
                                    <Button 
                                        className="text-black border-black rounded-full flex items-center font-ubuntu gap-2 
                                            hover:bg-gray-200 hover:border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}
