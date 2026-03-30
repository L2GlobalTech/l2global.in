import React, { FC } from 'react'

interface ISectionHeader {
    title: string
    desc?: string
    aosTitle?: string      
    aosDesc?: string       
    aosDelayTitle?: number 
    aosDelayDesc?: number  
    aosDuration?: number   
}

const SectionHeader: FC<ISectionHeader> = ({
    title,
    desc,
    aosTitle = "fade-up",
    aosDesc = "fade-up",
    aosDelayTitle = 0,
    aosDelayDesc = 200,
    aosDuration = 700,
}) => {
    return (
        <div className="w-full px-4">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">

                {/* Title */}
                <h2
                    className="text-3xl md:text-5xl font-medium text-black md:tracking-[-3px] tracking-[-1.5px]"
                    data-aos={aosTitle}
                    data-aos-delay={aosDelayTitle}
                    data-aos-duration={aosDuration}
                    data-aos-once="true"
                >
                    {title}
                </h2>

                {/* Description */}
                {desc && (
                    <div className="flex justify-center mt-3">
                        <p
                            className="text-[#494852] text-sm sm:text-base md:text-lg w-full md:max-w-xl font-normal md:tracking-[-1px] tracking-[-0.5px]"
                            style={{ lineHeight: '26px' }}
                            data-aos={aosDesc}
                            data-aos-delay={aosDelayDesc}
                            data-aos-duration={aosDuration}
                            data-aos-once="true"
                        >
                            {desc}
                        </p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default SectionHeader
