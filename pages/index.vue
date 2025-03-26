<script setup>
import { getProjectsApi, askQuestionApi } from "../script/api";
import { marked } from "marked";
let isSidebarOpen = ref(true);
let projectName = ref();
let sideBar = ref();
let prompt = ref();
let chatBox = ref();
let informationText = ref();
const route = useRoute();
let openSideBar = () => {
    if (window.innerWidth < 700) {
        sideBar.value.classList.add();

        if (sideBar.value.style.display === "flex") {
            setTimeout(() => {
                sideBar.value.classList.remove("active");
                sideBar.value.classList.add("de-active");
            }, 10);

            setTimeout(() => {
                sideBar.value.style.display = "none";
            }, 700);
        } else {
            setTimeout(() => {
                sideBar.value.classList.remove("de-active");
                sideBar.value.classList.add("active");
            }, 10);

            sideBar.value.style.display = "flex";
            sideBar.value.style.position = "absolute";
        }
    } else if (window.innerWidth > 700) {
        sideBar.value.style.display = "flex";
    }
};
let loadProjects = async () => {
    let projects = await getProjectsApi();

    for (let i = 0; i < projects.results.length; i++) {
        let project = projects.results[i];
        document.getElementById("projects-list").innerHTML +=
            `<div class="w-full h-11 bg-[#424242] rounded-lg overflow-hidden flex justify-between mb-3 hover:opacity-70 cursor-pointer" id="project-${project.id}"><div class="flex items-center"><div class="bg-red-500 h-full w-[6px]"></div><img src="img/folder.svg" class="size-5 ml-4" /><span class="font-semibold text-xs text-white block ml-3">${project.name}</span></div><div class="flex items-center"><img class="size-4 opacity-60 mr-6 cursor-pointer z-50" src="img/3dots.svg" /></div></div>`;

        setTimeout(() => {
            let projectElement = document.getElementById(`project-${project.id}`);

            if (projectElement) {
                projectElement.addEventListener("click", () => {
                    navigateTo({ query: { id: project.id } });
                    projectName.value.innerText = project.name;
                });
            }
        }, 0);
    }
};
function sendPrompt() {
    let removeInformationBox = false;
    let queryId = route.query.id;

    if (queryId) {
        if (prompt.value) {
            if (!removeInformationBox) {
                informationText.value.innerHTML = "";
                chatBox.value.style.display = "flex";
                removeInformationBox = true;
            }

            chatBox.value.classList.add("chat");

            chatBox.value.innerHTML += `<div id="message" class="bg-[rgb(203,184,247)] text-right min-h-16 flex items-center pb-1 px-4 rounded-xl relative mt-3 min-w-16 shrink-0"><div class="mb-4">${prompt.value}</div><div class="absolute bottom-0.5 right-4">${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}</div></div><div id="wait-animation" class="Animation my-3"></div>`;

            chatBox.value.scrollTop = chatBox.value.scrollHeight;

            askQuestionApi(queryId, prompt.value)
                .then(async (res) => {
                    const parsedAnswer = marked.parse(res.data.ai);
                    chatBox.value.innerHTML += `<div id="message" class="bg-[rgb(228,216,255)] text-right min-h-16 flex items-center pb-1 px-4 rounded-xl relative mt-3 min-w-16 shrink-0"><div class="mb-6">${parsedAnswer}</div><div class="absolute bottom-0.5 right-4 ">${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}</div></div>`;
                    chatBox.value.scrollTop = chatBox.value.scrollHeight;

                    let animations = document.querySelectorAll("#wait-animation");
                    animations.forEach((everyAnimation) => {
                        everyAnimation.style.display = "none";
                    });
                })
                .catch((err) => {
                    let animations = document.querySelectorAll("#wait-animation");
                    animations.forEach((everyAnimation) => {
                        everyAnimation.style.display = "none";
                    });
                    history.pushState(null, null, `?id=`);
                });
        }

        document.querySelectorAll("#message").forEach((m) => {
            m.classList.add("animate-up");
        });
    } else {
        alert("لطفا یک پروژه را انتخاب کنید");
    }
}
onMounted(() => {
    if (localStorage.getItem("token")) {
        loadProjects();
    } else {
        navigateTo("/login");
    }
});

let logout = () => {
    navigateTo('login')
    localStorage.removeItem('token')
};
</script>
<template>
    <div class="flex lg:w-full min-h-screen overflow-hidden relative">
        <div v-if="isSidebarOpen" class="lg:w-3/12 w-9/12 h-screen z-50 lg:flex flex-col items-center bg-black relative px-8" ref="sideBar" id="side-bar">
            <div class="side-bar-gradiant size-[1000px] absolute left-[-500px]"></div>
            <div class="bg-black/30 lg:w-full w-11/12 lg:mb-9 mb-5 mt-9 z-50 rounded-2xl flex flex-col justify-between">
                <div>
                    <div class="w-full flex justify-end">
                        <img class="size-6 mt-2 mr-2 cursor-pointer z-50 hover:opacity-60" src="/img/3dots.svg" />
                    </div>
                    <div class="w-full bg-[#242723] h-12 lg:mt-14 mt-4 rounded-xl flex justify-between items-center px-5 text-white cursor-pointer">
                        <span class="block text-sm font-semibold">Begin a New Chat</span>
                        <img class="size-6 hover:opacity-70" src="/img/plus.svg" />
                    </div>
                    <div class="mx-4">
                        <div class="w-full h-10 bg-[#424242] rounded-xl mt-8 flex items-center px-4">
                            <img src="/img/search.svg" class="opacity-60 size-5" />
                            <input class="text-white ml-2 text-sm font-semibold outline-none w-full bg-transparent" placeholder="Search" />
                        </div>
                        <span class="text-white font-semibold text-xs my-3 block">Projects</span>
                        <div class="lg:h-[320px] h-[280px] overflow-scroll" id="projects-list"></div>
                    </div>
                </div>
            </div>
            <div class="z-50 h-14 lg:w-full w-11/12 bg-[#242723] rounded-xl flex items-center px-4 justify-between">
                <div class="flex items-center text-white cursor-pointer hover:opacity-70">
                    <img src="/img/profile.svg" class="size-5 mr-1 mb-1" />
                    <span class="text-xs">User Profile</span>
                </div>
                <img src="/img/logout.svg" class="size-3 cursor-pointer hover:opacity-70" @click="logout" title="Log out" />
            </div>
        </div>
        <div class="lg:w-9/12 w-full flex flex-col justify-between" id="main-screen">
            <div>
                <div class="w-full flex justify-between items-center">
                    <p class="logo-gradiant text-2xl font-bold ml-12 mt-13 h-fit z-20">ModoCode</p>
                    <div class="flex justify-center w-full">
                        <div class="w-32 h-10 bg-[rgb(217,205,245)] mt-11 mr-[15%] rounded-full flex items-center justify-center mb-1"><p ref="projectName" id="project-name"></p></div>
                    </div>
                    <div class="flex items-center justify-center flex-col absolute top-[45px] lg:right-[80px] right-[50px] lg:size-[60px] size-[40px] z-50 hover:bg-black/10 rounded-full">
                        <div class="flex items-end flex-col" @click="isSidebarOpen = !isSidebarOpen">
                            <div class="w-[30px] border-b-[3px] border-black mt-2 rounded-full"></div>
                            <div class="w-[20px] border-b-[3px] border-black mt-1 rounded-full"></div>
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
                <div dir="ltr" ref="chatBox" class="pl-[30%] absolute bottom-28 right-[50px] lg:max-h-[500px] max-h-[400px] h-fit flex-col overflow-y-auto hidden"></div>
                <div ref="informationText" class="flex flex-col items-center w-full z-20">
                    <div class="text-center lg:w-[445px] w-[330px]">
                        <p class="lg:text-3xl text-xl font-semibold font-inter tracking-tight">How can We <span class="logo-gradiant"> assist </span>you today?</p>
                        <p class="lg:text-[16px] text-sm"></p>
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center lg:mb-8 mb-24 lg:z-50 z-20">
                <div class="w-11/12 h-16 bg-[#8C8C8C3D] rounded-full flex justify-between px-2 items-center">
                    <div class="flex items-center">
                        <div>
                            <button class="bg-[#424242] size-12 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80">
                                <img src="/img/paperclip.svg" class="size-7" />
                            </button>
                        </div>
                    </div>
                    <input @keypress.enter.exact="sendPrompt" id="message-box" v-model="prompt" placeholder="type your prompt here" type="text" class="placeholder:text-black w-full mx-5 outline-none h-10 bg-transparent" />
                    <div class="flex items-center justify-center rounded-full" @click="sendPrompt()">
                        <button class="bg-[#9747FF] size-12 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90">
                            <img src="/img/arrow.svg" class="size-8" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
