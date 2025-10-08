import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./index";

const meta: Meta<typeof Card> = {
    title: "Components/Card",
    component: Card,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
The **Card** component is a flexible container to display grouped content in a visually appealing way.  
It supports multiple **variants**, **sizes**, **interactive effects**, and **animations** for modern UIs.

### Features
- Multiple visual variants: default, elevated, glass, gradient, neon, outline, minimal, premium, success, warning, error, info
- Responsive sizes: sm, md, lg, xl
- Interactive hover/press effects: hover, press, lift, tilt, glow
        `,
            },
        },
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "elevated", "glass", "gradient", "neon", "outline", "minimal", "premium", "success", "warning", "error", "info"],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg", "xl"],
        },
        interactive: {
            control: "select",
            options: ["none", "hover", "press", "lift", "tilt", "glow"],
        },
        animation: {
            control: "select",
            options: ["none", "fadeIn", "slideUp", "scaleIn", "flipIn", "bounceIn", "floatIn"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const BasicCard: Story = {
    args: {
        variant: "default",
        size: "md",
        interactive: "hover",
        animation: "fadeIn",
        children: (
            <>
                <CardHeader>
                    <CardTitle>Basic Card</CardTitle>
                    <CardDescription>This is a simple card with a title and description.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        You can place any content here. The card supports animations,
                        variants, and interactive hover effects.
                    </p>
                </CardContent>
                <CardFooter justify="end">
                    <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80">
                        Learn More
                    </button>
                </CardFooter>
            </>
        ),
    },
};

export const PremiumAnimatedCard: Story = {
    args: {
        variant: "premium",
        size: "lg",
        interactive: "lift",
        animation: "slideUp",
        children: (
            <>
                <CardHeader>
                    <CardTitle gradient="purple">Premium Experience</CardTitle>
                    <CardDescription>Beautiful gradient title with premium style.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        This card uses the <strong>premium</strong> variant and{" "}
                        <em>slideUp</em> animation. It’s perfect for feature sections,
                        dashboards, or highlighted content.
                    </p>
                </CardContent>
                <CardFooter justify="between">
                    <span className="text-muted-foreground text-sm">Updated 2 days ago</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:opacity-90">
                        Explore
                    </button>
                </CardFooter>
            </>
        ),
    },
};
