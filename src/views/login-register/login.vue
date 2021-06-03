<template>
 <div class="section-padding">
  <div class="container">
    <section class="register-wrapper display-flex w-100 flex-direction-column-mobile">
      <div class="register-wrapper--image-wrapper display-flex">
        <h2 class="margin-auto text-center">Your Personal Loan is just a click away!</h2>
      </div>
      <form @submit.prevent="submit" class="register-wrapper--form-wrapper">
        <div class="text-center">
          <h2>Welcome to Aspire</h2>
          <h3>Login</h3>
        </div>
        <div class="form-group" :class="{ 'form-group--error': $v.phoneNumber.$error }">
          <label>Mobile Number</label>
          <input type="text" placeholder="Enter the Mobile Number" class="form-control" v-model.trim="$v.phoneNumber.$model" />
          <div class="error">
            <template v-if="!$v.phoneNumber.required">
              Mobile Number is required
            </template>
            <template v-if="!$v.phoneNumber.minLength || !$v.phoneNumber.maxLength || !$v.phoneNumber.numeric">
              Please enter a valid Mobile Number
            </template>
          </div>
        </div>
        <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
          <label>Password</label>
          <input type="password" placeholder="Enter the Password" class="form-control" v-model.trim="$v.password.$model" />
          <div class="error">
            <template v-if="!$v.password.required">
              Password is required
            </template>
            <template v-if="!$v.password.minLength">
              Password must have at least {{$v.password.$params.minLength.min}} letters.
            </template>
          </div>
        </div>
        <div class="form-group text-center">
          <button class="theme-button" type="submit" :disabled="submitStatus === 'PENDING'">Sign Up</button>
        </div>
      </form>
    </section>
  </div>
 </div>
</template>

<script>
import '@/assets/scss/pages/login-register.scss';
import { login } from '@/services/login-register.api';
import {
  required, numeric, minLength, maxLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  data() {
    return {
      // variable to store the Phone Number
      phoneNumber: '',
      // variable to store the password
      password: '',
      // variable to store the form submit status
      submitStatus: null,
    };
  },
  // All the field validation rules are defined here wrt the v-model
  validations: {
    phoneNumber: {
      required,
      numeric,
      minLength: minLength(10),
      maxLength: maxLength(10),
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  // method called on Register form submition
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        this.submitStatus = 'PENDING';
        const requestBodyObj = {
          phoneNumber: this.phoneNumber,
          password: this.password,
        };
        this.validateUser(requestBodyObj);
      }
    },
    // method to validate user and store the login details in local storage for session
    async validateUser(requestBodyObj) {
      const response = await login(requestBodyObj);
      if (response.statusCode === 200) {
        localStorage.setItem('loginnedUser', JSON.stringify(response.userData[0]));
        this.$swal.fire(
          'Success',
          response.statusMessage,
          'success',
        );
        // reset form data
        this.phoneNumber = '';
        this.password = '';
        // push the user to dashboard page
        this.$router.push({ name: 'dashboard' });
      } else {
        this.$swal.fire(
          'Error',
          response.statusMessage,
          'error',
        );
      }
      this.submitStatus = 'OK';
    },
  },
};
</script>
