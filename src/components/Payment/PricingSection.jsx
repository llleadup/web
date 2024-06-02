
const PricingSection = () => {
  return (
    <section id="pricing" class="bg-bg-accent w-full mx-auto py-16 md:py-24">
      <div class="xl:max-w-7xl px-6 xl:px-0 mx-auto">
        <span class="block mb-3 text-base text-primary font-bold text-center">
          Pricing
        </span>
        <h2 class="text-3xl lg:text-5xl font-bold text-center">
          Get Started with the Right Plan
        </h2>
        <div class="flex flex-col md:flex-row gap-8 mt-16 justify-center mb-10">
          <div class="p-8 bg-bg rounded-lg flex flex-col justify-between gap-16 md:w-[340px] border border-transparent">
            <div>
              <h4 class="font-bold text-xl">Basic</h4>
              <span class="block mt-2.5 text-4xl font-extrabold">$29</span>
              <ul class="mt-6 flex flex-col gap-3.5">
                <li>✅ Convenient road maps</li>
                <li>✅ Useful tools</li>
                <li>✅ Step-by-step instructions</li>
                <li>✅ Lead generation channels</li>
                <li>✅ Todo lists</li>
              </ul>
            </div>
            <form method="POST" onSubmit={handleSubmit}>
              <button
                type="submit"
                class="bg-primary w-full rounded-lg flex items-center py-4 justify-center text-sm font-medium"
              >
                Get Started
              </button>
              <span class="block mt-2.5 text-sm font-medium text-center">
                Pay once. Access forever.
              </span>
            </form>
          </div>
          <div class="p-8 bg-bg rounded-lg flex flex-col justify-between gap-16 md:w-[340px] border border-primary">
            <div>
              <div class="flex gap-2.5 items-center">
                <h4 class="font-bold text-xl">Premium</h4>
                <span class="py-1.5 px-3 rounded-lg border border-primary font-medium text-xs bg-[#0098e933] text-primary">
                  Popular
                </span>
              </div>
              <span class="block mt-2.5 text-4xl font-extrabold">$49</span>
              <ul class="mt-6 flex flex-col gap-3.5">
                <li>✅ Convenient roadmaps</li>
                <li>✅ Useful tools</li>
                <li>✅ Step-by-step instructions</li>
                <li>✅ Lead generation channels</li>
                <li>✅ To-do lists</li>
                <li>✅ Personal sales support</li>
                <li>✅ Trigger email templates</li>
                <li>✅ It's just better</li>
              </ul>
            </div>
            <form method="POST" action="/api/payment/checkout_sessions">
              <button
                type="submit"
                class="bg-primary w-full rounded-lg flex items-center py-4 justify-center text-sm font-medium"
              >
                Get Started
              </button>
              <span class="block mt-2.5 text-sm font-medium text-center">
                Pay once. Access forever.
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
