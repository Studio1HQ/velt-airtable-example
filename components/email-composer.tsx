"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  Paperclip,
  Image,
  Smile,
  MoveHorizontal as MoreHorizontal,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import EmailEditor from "@/components/EmailEditor";
import initialContent from "@/constant/general";

export function EmailComposer() {
  const [showCC, setShowCC] = useState(false);
  const [showBCC, setShowBCC] = useState(false);
  const [to, setTo] = useState("");
  const [cc, setCC] = useState("");
  const [bcc, setBCC] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="shadow-lg border-0 bg-card">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <Send className="h-6 w-6 text-primary" />
            Compose Email
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email Recipients */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="to" className="text-sm font-medium">
                To
              </Label>
              <div className="flex gap-2">
                <Input
                  id="to"
                  type="email"
                  placeholder="recipient@example.com"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="flex-1"
                />
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCC(!showCC)}
                    className={showCC ? "bg-accent" : ""}
                  >
                    CC
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBCC(!showBCC)}
                    className={showBCC ? "bg-accent" : ""}
                  >
                    BCC
                  </Button>
                </div>
              </div>
            </div>

            <Collapsible open={showCC} onOpenChange={setShowCC}>
              <CollapsibleContent className="space-y-2">
                <Label htmlFor="cc" className="text-sm font-medium">
                  CC
                </Label>
                <Input
                  id="cc"
                  type="email"
                  placeholder="cc@example.com"
                  value={cc}
                  onChange={(e) => setCC(e.target.value)}
                />
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={showBCC}
              onOpenChange={() => setShowBCC(!showBCC)}
            >
              <CollapsibleContent className="space-y-2">
                <Label htmlFor="bcc" className="text-sm font-medium">
                  BCC
                </Label>
                <Input
                  id="bcc"
                  type="email"
                  placeholder="bcc@example.com"
                  value={bcc}
                  onChange={(e) => setBCC(e.target.value)}
                />
              </CollapsibleContent>
            </Collapsible>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">
                Subject
              </Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="text-base"
              />
            </div>
          </div>

          <Separator />

          {/* Rich Text Editor */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Message</Label>
            <EmailEditor content={initialContent} />
          </div>

          {/* Attachment and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Paperclip className="h-4 w-4" />
                Attach
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Image className="h-4 w-4" />
                Image
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Smile className="h-4 w-4" />
                Emoji
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2 sm:ml-auto">
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors">
                <Send className="h-4 w-4" />
                Send Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Templates</h3>
            <p className="text-sm text-muted-foreground">
              Use pre-built email templates
            </p>
          </div>
        </Card>

        <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Paperclip className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Drafts</h3>
            <p className="text-sm text-muted-foreground">Access saved drafts</p>
          </div>
        </Card>

        <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Image className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Signatures</h3>
            <p className="text-sm text-muted-foreground">
              Manage email signatures
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
