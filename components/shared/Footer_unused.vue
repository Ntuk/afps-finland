<template>
  <div class="hero-footer footer footer-custom">
    <div class="footer-container">
      <div class="footer-left-side">
        © Nico tukiainen 2020
      </div>
      <div class="footer-center">
      </div>
      <div class="footer-right-side">
        <div>
          <span class="icon">
            <a target="_" href="https://github.com/Ntuk"><i class="fab fa-github" fa-rotate-270></i></a>
          </span>
        </div>
        <div>
          <span class="icon">
            <a target="_" href="https://www.facebook.com/nico.tukiainen"><i class="fab fa-facebook"></i></a>
          </span>
        </div>
        <div>
          <span class="icon">
            <a target="_" href="https://www.instagram.com/nicotuk/"><i class="fab fa-instagram"></i></a>
          </span>
        </div>
        <div>
          <span class="icon">
            <a target="_" href="https://discordapp.com/users/ntuk#2369"><i class="fab fa-discord"></i></a>
          </span>
        </div>
        <div>
          <span class="icon">
            <a target="_" href="https://www.linkedin.com/in/nico-tukiainen-a97442131/"><i class="fab fa-linkedin"></i></a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  /* footer */
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    align-self: flex-end;
    justify-content: center;
    align-items:  center;
    background: rgb(52,73,94);
    background: radial-gradient(circle, rgba(52,73,94,1) 0%, rgba(44,62,80,1) 100%);
    padding: 20px 0;
    margin-top: 50px;
  }
  .icon {
    display: inline-flex;
    // padding-left: 40px;
    // padding-right: 40px;
    font-size: 25px;

    &:hover {
      color: rgb(126, 179, 194);
      transition:  0.8s;
    }
  }
  .footer-container {
    display: flex;
    justify-content: space-between;
  }
  .footer-left-side  {
    justify-content: space-evenly;
    display: flex;
    width: 40%;
    font-size: 14px;
    color: #e67e22;   
  }
  .footer-center {
    width: 20%;
    justify-content: space-evenly;
    color: #e67e22;
    font-size: 14px;
  }
  .footer-right-side {
    width: 40%;
    order: 1;
    display: flex;
    justify-content: space-evenly;
  }

  .footer-custom {
      background-color: #0d0c0d;
      color: #fff;
  }
  .footer-custom p {
      font-size: 1rem;
      font-weight: 500;
  }
  .footer-custom a {
      color: #e67e22;
  }
  .footer-custom a:hover {
      color: #d35400;
  }
</style>
