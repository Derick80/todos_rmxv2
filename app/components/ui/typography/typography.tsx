import React from 'react'
import { cn } from '~/lib/utils'

export const H1 = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h1
        ref={ref}
        className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        {...props}
    />
))
H1.displayName = 'H1'
export const H2 = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn(
            'scroll-m-20 border-b border-primary pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
            className
        )}
        {...props}
    />
))
H2.displayName = 'H2'

export const H3 = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            'scroll-m-20 text-2xl font-semibold tracking-tight',
            className
        )}
        {...props}
    />
))

H3.displayName = 'H3'

export const H4 = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h4
        ref={ref}
        className={cn(
            'scroll-m-20 text-xl font-semibold tracking-tight',
            className
        )}
        {...props}
    />
))

H4.displayName = 'H4'

export const P = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
        {...props}
    />
))

P.displayName = 'P'

export const Large = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-lg font-semibold', className)}
        {...props}
    />
))

Large.displayName = 'Large'

export const Small = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm font-semibold', className)}
        {...props}
    />
))

Small.displayName = 'Small'

export const Medium = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-base font-semibold', className)}
        {...props}
    />
))

Medium.displayName = 'Medium'

export const Tiny = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-xs font-semibold', className)}
        {...props}
    />
))

Tiny.displayName = 'Tiny'

export const Muted = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
))

Muted.displayName = 'Muted'
