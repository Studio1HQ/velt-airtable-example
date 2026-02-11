import { EmailComposer } from "@/components/email-composer";
import { Navbar } from "@/components/navbar";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navbar />
      <main className="pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
              Professional Email Composer
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create beautiful, rich-text emails with our modern composer
              featuring advanced formatting and intuitive design.
            </p>
          </div>
        </div>
        <EmailComposer />
      </main>
    </div>
  );
};

export default Home;
