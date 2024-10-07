<script setup></script>

<template>
    <footer>
        <div class="container">
            <el-row :gutter="10">
                <el-col :xs="12" :sm="8" :md="8">
                </el-col>
                <el-col :xs="12" :sm="8" :md="8">
                </el-col>
                <el-col :xs="0" :sm="8" :md="8">
                </el-col>
            </el-row>
            <p class="copyright">
                © 2024 WeiEN. This is a practical exam for interview purposes only.
            </p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
footer {
    background-color: #29abe2;
    padding: 0 20px;
    min-width: 768px;
}

.container {
    color: #ffffff;

    .el-col {
        padding: 25px 0;
    }

    .copyright {
        padding-bottom: 30px;
        text-align: center;
        color: #ffffff;
    }
}
</style>