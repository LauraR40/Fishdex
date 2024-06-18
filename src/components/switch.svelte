<form style="width: 30%;">
  <div class="form-field">
    <div class="field-inner">
      <div class="switch">
        <input
          style="width: 4rem;
    height: 4rem;"
          type="checkbox"
          name="checkbox"
          id="check1"
        />
        <span class="checked"></span>
      </div>
    </div>
  </div>
</form>

<style>
  form {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .form-field:not(:last-child) {
    margin-bottom: 2em;
  }

  .switch {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0 auto;
  }
  .switch:not(:last-child) {
    margin-bottom: 1em;
  }
  .switch input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0;
  }
  .switch .checked {
    position: absolute;
    left: 0;
    z-index: 0;
    width: 50px;
    height: 20px;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.38);
    -webkit-transition: background 200ms ease;
    transition: background 200ms ease;

    pointer-events: none;
  }
  .switch .checked:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #a5a5a5;
    -webkit-box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.3);
    -webkit-transform: translate(-5px, -50%);
    transform: translate(-5px, -50%);
    -webkit-transition: transform 200ms cubic-bezier(0.65, 0.38, 0.29, 1.19);
    transition: transform 200ms cubic-bezier(0.65, 0.38, 0.29, 1.19);
  }
  .switch input:checked ~ .checked {
    background-color: rgba(71, 106, 173, 0.5);
  }
  .switch input:checked ~ .checked:after {
    background-color: #476aad;
    -webkit-transform: translate(23px, -50%);
    transform: translate(23px, -50%);
  }
</style>
