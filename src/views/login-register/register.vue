<template>
  <div class="section-padding">
    <div class="container">
    <section class="register-wrapper display-flex w-100 flex-direction-column-mobile">
      <div class="register-wrapper--image-wrapper display-flex">
        <h2 class="margin-auto text-center">Your Personal Loan is just a click away!</h2>
      </div>
      <form @submit.prevent="submit" class="register-wrapper--form-wrapper ">
        <div class="text-center">
          <h2>Welcome to Aspire</h2>
          <h3>Register Now</h3>
        </div>
        <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
          <label>Name</label>
          <input type="text" placeholder="Enter the name" class="form-control" v-model.trim="$v.name.$model" />
          <div class="error">
            <template v-if="!$v.name.required">
              Name is required
            </template>
            <template v-if="!$v.name.minLength">
              Name must have at least {{$v.name.$params.minLength.min}} letters.
            </template>
          </div>
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
        <div class="form-group" :class="{ 'form-group--error': $v.repeatPassword.$error }">
          <label>Confirm Password</label>
          <input type="password" placeholder="Enter the Password" class="form-control" v-model.trim="$v.repeatPassword.$model" />
          <div class="error">
            <template v-if="!$v.repeatPassword.sameAsPassword">
              Passwords must be identical.
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
import { registerUser } from '@/services/login-register.api';
import {
  required, minLength, sameAs, numeric, maxLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'Register',
  data() {
    return {
      // variable to store the Customer name
      name: '',
      // variable to store the Phone Number
      phoneNumber: '',
      // variable to store the password
      password: '',
      // variable to store password confirmation
      repeatPassword: '',
      // variable to store the form submit status
      submitStatus: null,
    };
  },
  // All the field validation rules are defined here wrt the v-model
  validations: {
    name: {
      required,
      minLength: minLength(3),
    },
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
    repeatPassword: {
      sameAsPassword: sameAs('password'),
    },
  },
  methods: {
    // method called on Register form submition
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        this.submitStatus = 'PENDING';
        const requestBodyObj = {
          name: this.name,
          phoneNumber: this.phoneNumber,
          password: this.password,
        };
        this.registerCustomer(requestBodyObj);
      }
    },
    // method to register user
    async registerCustomer(requestBodyObj) {
      const response = await registerUser(requestBodyObj);
      this.submitStatus = 'OK';
      if (response.status === 201) {
        this.$swal.fire({
          title: response.statusMessage,
          confirmButtonText: 'Sign In',
          icon: 'success',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$router.push('/login');
          } else if (result.isDenied) {
            console.log('same page');
          }
        });
        // reset formvalidation
        this.$v.$reset();
        // reset form values
        this.name = '';
        this.phoneNumber = '';
        this.password = '';
        this.repeatPassword = '';
      } else {
        this.$swal.fire(
          'Error',
          response.statusMessage,
          'error',
        );
      }
    },
  },
};
</script>
