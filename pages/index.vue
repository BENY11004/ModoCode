<template>
    <div class="flex lg:w-full min-h-screen overflow-hidden relative">
        <div class="bg-black lg:w-3/12 w-9/12 h-screen z-50 lg:flex flex-col items-center-center hidden relative px-8" id="side-bar">
            <div class="side-bar-gradiant size-[1000px] absolute left-[-500px]"></div>
            <div class="bg-black/30 lg:w-full w-11/12 lg:mb-9 mb-5 mt-9 z-50 rounded-2xl flex flex-col justify-between">
                <div>
                    <div class="w-full flex justify-end">
                        <img class="size-6 mt-2 mr-2 cursor-pointer z-50 hover:opacity-60" src="../public/img/3dots.svg" />
                    </div>
                    <div class="w-full bg-[#242723] h-12 lg:mt-14 mt-4 rounded-xl flex justify-between items-center px-5 text-white cursor-pointer">
                        <span class="block text-sm font-semibold">Begin a New Chat</span>
                        <img class="size-6 hover:opacity-70" src="../public/img/plus.svg" />
                    </div>
                    <div class="mx-4">
                        <div class="w-full h-10 bg-[#424242] rounded-xl mt-8 flex items-center px-4">
                            <img src="../public/img/search.svg" class="opacity-60 size-5" />
                            <input class="text-white ml-2 text-sm font-semibold outline-none w-full" placeholder="Search" />
                        </div>
                        <span class="text-white font-semibold text-xs my-3 block">Projects</span>
                        <div class="lg:h-[320px] h-[280px] overflow-scroll" id="projects-list"></div>
                    </div>
                </div>
            </div>
            <div class="z-50 h-14 lg:w-full w-11/12 bg-[#242723] rounded-xl flex items-center px-4 justify-between">
                <div class="flex items-center text-white cursor-pointer hover:opacity-70">
                    <img src="../public/img/profile.svg" class="size-5 mr-1 mb-1" />
                    <span class="text-xs">User Profile</span>
                </div>
                <img src="../public/img/logout.svg" class="size-3 cursor-pointer hover:opacity-70" title="Log out" />
            </div>
        </div>
        <div class="lg:w-9/12 w-full flex flex-col justify-between" id="main-screen">
            <div>
                <div class="w-full flex justify-between items-center">
                    <p class="logo-gradiant text-2xl font-bold ml-12 mt-13 h-fit z-20">ModoCode</p>
                    <div class="flex justify-center w-full">
                        <div class="w-32 h-10 bg-[rgb(217,205,245)] mt-11 mr-[15%] rounded-full flex items-center justify-center mb-1"><p id="project-name"></p></div>
                    </div>
                    <div class="flex items-center justify-center flex-col absolute top-[45px] lg:right-[80px] right-[50px] lg:size-[60px] size-[40px] z-50 hover:bg-black/10 rounded-full">
                        <div class="flex items-end flex-col" onclick="openSideBar()">
                            <div class="w-[30px] border-b-[3px] bg-black mt-2 rounded-full"></div>
                            <div class="w-[20px] border-b-[3px] bg-black mt-1 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div class="lg:flex hidden absolute h-screen w-full">
                    <div class="header-gradiant size-[1000px] absolute top-[-500px] right-[-100px] z-30"></div>
                    <div class="cneter-gradiant size-[300px] absolute top-[10%] left-[25%] z-10"></div>
                    <div class="cneter-gradiant size-[300px] absolute top-[15%] left-[28%] z-10"></div>
                    <div class="cneter-gradiant size-[300px] absolute top-[20%] left-[30%] z-10"></div>
                    <div class="left-gradiant size-[300px] absolute top-[70px] left-[-10%] z-40"></div>
                </div>
                <div class="lg:hidden flex relative">
                    <div class="header-gradiant size-[700px] bg-transparent absolute top-[-250px] left-[-350px] z-10"></div>
                    <div class="header-gradiant size-[700px] bg-transparent absolute right-[-400px] z-10"></div>
                </div>
            </div>
            <div class="flex flex-col justify-center w-full lg:px-12 px-5 py-4 z-40">
                <div dir="ltr" id="chat-box" class="max-w-8/12 absolute bottom-28 right-[50px] lg:max-h-[500px] max-h-[400px] h-fit flex-col overflow-y-auto hidden"></div>
                <div id="information-text" class="flex flex-col items-center w-full z-20">
                    <div class="text-center lg:w-[445px] w-[330px]">
                        <p class="lg:text-3xl text-xl font-semibold font-inter tracking-tight">How can We <span class="logo-gradiant"> assist </span>you today?</p>
                        <p class="lg:text-[16px] text-sm">Get expert guidance powered by AI agents specializing in Sales, Marketing, and Negotiation. Choose the agent that suits your needs and start your conversation with ease.</p>
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center lg:mb-8 mb-24 lg:z-50 z-20">
                <div class="w-11/12 h-16 bg-[#8C8C8C3D]/75 rounded-full flex justify-between px-2 items-center">
                    <div class="flex items-center">
                        <div>
                            <button class="bg-[#424242] size-13 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80">
                                <img src="../public/img/paperclip.svg" class="size-7" />
                            </button>
                        </div>
                    </div>
                    <input id="message-box" placeholder="type your prompt here" type="text" class="placeholder:text-black w-full mx-5 outline-none h-10" />
                    <div class="flex items-center justify-center rounded-full" onclick="sendPrompt()">
                        <button class="bg-[#9747FF] size-13 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90">
                            <img src="../public/img/arrow.svg" class="size-8" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
