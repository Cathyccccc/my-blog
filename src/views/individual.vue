<template>
  <div class="individual-container">
    <h3>Profiles</h3>
    <p class="profile">INTJ一枚，爱好推理。</p>
    <h3>Contact Me</h3>
    <ul class="concat-list">
      <li>
        <h5>微信：</h5>
        <img src="../../public/wechat.jpg" alt="">
      </li>
      <li>
        <h5>邮箱：</h5>
        <div class="email">1837803467@qq.com</div>
      </li>
    </ul>
    <p class="info">欢迎联系我交流技术~ 共同进步~</p>
  </div>
</template>

<script></script>

<style scoped>
.individual-container {
  padding: 0 100px;
}
.concat-list {
  display: flex;
  justify-content: flex-start;
  column-gap: 100px;
}
h3 {
  margin-bottom: 5px;
}
img {
  width: 200px;
}
.email {
  font-weight: bold;
  line-height: 100px;
}
.profile {
  margin-bottom: 50px;
}
.info {
  color: #55BBFF;
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
}
</style>