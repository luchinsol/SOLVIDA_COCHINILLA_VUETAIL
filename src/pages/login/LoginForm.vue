<template>
  <!-- FORM -->
  <form class="space-y-5">
    <!-- USER -->
    <div>
      <label class="block text-sm text-neutral-700 mb-2"> Username or Email </label>

      <div class="relative">
        <i class="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></i>

        <input
          type="text"
          placeholder="Enter your username or email"
          class="w-full pl-10 pr-3 py-2.5 border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900"
        />
      </div>
    </div>

    <!-- PASSWORD -->
    <div>
      <label class="block text-sm text-neutral-700 mb-2"> Password </label>

      <div class="relative">
        <i class="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></i>

        <input
          type="password"
          placeholder="Enter your password"
          class="w-full pl-10 pr-10 py-2.5 border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900"
        />

        <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2">
          <i class="fa-solid fa-eye text-neutral-400 hover:text-neutral-600"></i>
        </button>
      </div>
    </div>

    <!-- OPTIONS -->
    <div class="flex items-center justify-between">
      <label class="flex items-center">
        <input type="checkbox" class="w-4 h-4 border-neutral-300 rounded text-neutral-900" />
        <span class="ml-2 text-sm text-neutral-700">Remember me</span>
      </label>

      <a href="#" class="text-sm text-neutral-900 hover:text-neutral-700"> Forgot password? </a>
    </div>

    <!-- BUTTON -->
    <button
      type="submit"
      class="w-full bg-neutral-900 text-white py-2.5 rounded-md hover:bg-neutral-800"
    >
      <i class="fa-solid fa-right-to-bracket mr-2"></i>
      Sign In
    </button>
  </form>
</template>
