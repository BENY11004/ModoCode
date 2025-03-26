<script setup>
    let userName = ref()
    let password = ref()
let login = async () => {
    if (userName.value.value != "" && password.value.value != "") {
        let res = await $fetch("https://ebot.moderndata.ir/api/v1/auth/login", {
            method: "POST",
            body:({
                username: userName.value.value,
                password: password.value.value,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        localStorage.setItem("token", await res.token);

        navigateTo('/')

    } else if (userName.value.value != "" && password.value.value == "") {
        password.value.placeholder = "لطفا رمز خود را وارد کنید";
    } else if (password != "" && userName == "") {
        userName.value.placeholder = "لطفا نام کاربری خود را وارد کنید";
    } else if (userName.value.value == "" && password.value.value == "") {
        password.value.placeholder = "لطفا رمز خود را وارد کنید";
        userName.value.placeholder = "لطفا نام کاربری خود را وارد کنید";
    }
};
</script>
<template>
    <div class="flex justify-center items-center login-background min-h-screen">
        <div class="w-[400px] h-[480px] rounded-2xl bg bg-black relative overflow-hidden flex justify-center">
            <div class="side-bar-gradiant size-[1000px] absolute left-[-500px] top-[-500px]"></div>
            <div class="side-bar-gradiant size-[1000px] absolute"></div>
            <div class="text-white w-10/12 flex flex-col items-center z-50 pt-16">
                <div>
                    <span class="text-xl">لطفا مشخصات خود را وارد کنید</span>
                </div>
                <div class="mt-8 flex flex-col gap-8">
                    <div class="flex flex-col items-end">
                        <label for="name">نام کاربری</label>
                        <input ref="userName" class="h-12 w-[300px] mt-2 rounded-xl px-5 bg-gray-200 text-black outline-none" id="name" type="text" />
                    </div>
                    <div class="flex flex-col items-end">
                        <label for="password">رمز عبور</label>
                        <input ref="password" class="h-12 w-[300px] mt-2 rounded-xl px-5 bg-gray-200 text-black outline-none" id="password" type="text" />
                    </div>
                    <div class="w-full flex justify-center mt-4">
                        <button class="bg-[rgb(129,100,165)] hover:bg-[rgb(172,144,206)] h-10 w-32 rounded-xl" @click="login">ثبت</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
