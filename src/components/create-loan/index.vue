<template>
 <div class="apply-loan-wrapper display-flex">
    <section class="register-wrapper display-flex w-100 flex-direction-column-mobile">
      <div class="register-wrapper--image-wrapper display-flex">
        <h2 class="margin-auto text-center">Your Personal Loan is just a click away!</h2>
      </div>
      <form @submit.prevent="submit" class="register-wrapper--form-wrapper position-relative">
        <a class="cursor-pointer close-button position-absolute" @click="$emit('closeCreateLoanPopup', true)">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
        </a>
        <div class="text-center">
          <h2>Welcome to Aspire</h2>
          <h3>Apply for Loan</h3>
        </div>
        <div class="form-group" :class="{ 'form-group--error': $v.loanAmount.$error }">
          <label>Loan Amount</label>
          <input type="text" placeholder="Enter the Loan Amount" class="form-control" v-model.trim="$v.loanAmount.$model" />
          <div class="error">
            <template v-if="!$v.loanAmount.required">
              Loan Amount is required
            </template>
            <template v-if="!$v.loanAmount.minLength || !$v.loanAmount.numeric">
              Please enter a valid Loan Amount
            </template>
          </div>
        </div>
        <div class="form-group" :class="{ 'form-group--error': $v.tenure.$error }">
          <label>Tenure (In Weeks)</label>
          <input type="text" placeholder="Enter the Tenure" class="form-control" v-model.trim="$v.tenure.$model" />
          <div class="error">
            <template v-if="!$v.tenure.required">
              Tenure is required
            </template>
            <template v-if="!$v.tenure.minLength || !$v.tenure.numeric">
              Please enter a valid Loan Tenure.
            </template>
          </div>
        </div>
        <div class="form-group text-center">
          <button class="theme-button" type="submit" :disabled="submitStatus === 'PENDING'">Apply Now</button>
        </div>
      </form>
    </section>
 </div>
</template>

<script>
import '@/assets/scss/pages/login-register.scss';
import { createLoan } from '@/services/loans.api';
import {
  required, numeric, minLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  props: {
    userobj: {
      type: Object,
    },
  },
  data() {
    return {
      // variable to store the Loan Amount
      loanAmount: '',
      // variable to store the password
      tenure: '',
      // variable to store the form submit status
      submitStatus: null,
    };
  },
  // All the field validation rules are defined here wrt the v-model
  validations: {
    loanAmount: {
      required,
      numeric,
      minLength: minLength(3),
    },
    tenure: {
      required,
      numeric,
      minLength: minLength(1),
    },
  },
  // method called on Register form submition
  methods: {
    // form submit
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        this.submitStatus = 'PENDING';
        const requestBodyObj = {
          isActiveLoan: true,
          isApproved: false,
          loanId: `L${new Date().getTime()}`,
          loanAmount: this.loanAmount,
          tenure: this.tenure,
          ...this.userobj,
        };
        this.applyLoan(requestBodyObj);
        this.submitStatus = 'OK';
      }
    },
    // apply loan / create loan
    async applyLoan(requestBodyObj) {
      const response = await createLoan(requestBodyObj);
      if (response.statusCode === 201) {
        this.$swal.fire(
          'Success',
          response.statusMessage,
          'success',
        );
        // reset form data
        this.loanAmount = '';
        this.tenure = '';
        // close the apply loan popup
        this.$emit('closeCreateLoanPopup', true);
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

<style lang="scss">
.apply-loan-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  .register-wrapper {
    margin: auto;
    &--form-wrapper {
      background: #ffffff;
      .close-button {
        top: 5px;
        right: 5px;
      }
    }
  }
}
</style>
