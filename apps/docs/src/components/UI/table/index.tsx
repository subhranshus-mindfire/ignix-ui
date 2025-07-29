import { useCallback, useEffect, useId, useState } from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Flex, Table as TableR, Theme, ThemeProps } from "@radix-ui/themes";
import { PaginationProps } from "./pagination";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { cn } from "../../../utils/cn";

export type TableSortBy = "asc" | "desc";

export interface TableProps {
    headings: Array<{
        label: React.ReactNode;
        key: string;
        sort: TableSortBy;
    }>;
    data: Array<Record<string, React.ReactNode>>;
    applySort: (key: string, value: TableSortBy) => void;
    variant?: "surface" | "ghost";
    headingVariant?: "row" | "column";
    size?: "sm" | "md" | "lg";
    animationVariant?: "fade" | "slide" | "scale" | "flip" | "elastic";
    showHoverEffects?: boolean;
    showStripes?: boolean;
    showBorders?: boolean;
    glowEffect?: boolean;
    // Add this new prop for unique row identification
    rowKeyExtractor?: (row: Record<string, React.ReactNode>, index: number) => string;
}

const animationCount: Record<string, number> = {};

// Enhanced animation variants for table content
const contentAnimations = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    },
    slide: {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.95 },
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    },
    scale: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }
    },
    flip: {
        initial: { opacity: 0, rotateX: -90 },
        animate: { opacity: 1, rotateX: 0 },
        exit: { opacity: 0, rotateX: 90 },
        transition: { duration: 0.6, ease: "easeInOut" }
    },
    elastic: {
        initial: { opacity: 0, scale: 0.3, rotate: -10 },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        exit: { opacity: 0, scale: 0.3, rotate: 10 },
        transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            duration: 0.8
        }
    }
};

// Helper function to create stable row keys
const createRowKey = (
    row: Record<string, React.ReactNode>, 
    index: number, 
    headings: Array<{key: string}>,
    customExtractor?: (row: Record<string, React.ReactNode>, index: number) => string
): string => {
    if (customExtractor) {
        return customExtractor(row, index);
    }
    
    // Create a stable key based on row content
    const contentKey = headings
        .map(heading => String(row[heading.key] || ''))
        .join('|');
    
    return `row-${contentKey}-${index}`;
};

function TableColumnHeadings({
    headings,
    data,
    applySort,
    variant = "surface",
    size = "md",
    animationVariant = "fade",
    showHoverEffects = true,
    showStripes = true,
    showBorders = true,
    glowEffect = false,
    rowKeyExtractor
}: TableProps): React.ReactNode {
    const tableId = useId();
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
    animationCount[tableId] = 0;

    const sizeConfig = {
        sm: { tableSize: "1", cellPadding: "2", fontSize: "1" },
        md: { tableSize: "2", cellPadding: "3", fontSize: "2" },
        lg: { tableSize: "3", cellPadding: "4", fontSize: "3" }
    };

    const config = sizeConfig[size];

    const handleSort: React.MouseEventHandler<HTMLElement> = useCallback(
        ev => {
            const target = ev.currentTarget;
            const key = target.getAttribute("data-key") as string;
            const currentSortValue = target.getAttribute(
                "data-sort-by",
            ) as TableSortBy;

            applySort(key, currentSortValue === "asc" ? "desc" : "asc");
        },
        [applySort],
    );

    return (
        <motion.div
            className="relative overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Premium glow effect */}
            {glowEffect && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

            <div className="relative overflow-hidden rounded-xl backdrop-blur-sm border border-border/40 shadow-lg shadow-black/5 dark:shadow-white/5">
                <TableR.Root
                    variant={variant}
                    size={config.tableSize as any}
                    className="w-full"
                >
                    {/* Enhanced Header */}
                    <TableR.Header>
                        <TableR.Row className="bg-gradient-to-r from-muted/50 via-muted/80 to-muted/50 backdrop-blur-sm border-b border-border/60">
                            {headings.map((heading) => (
                                <TableR.ColumnHeaderCell
                                    key={heading.key}
                                    className={cn(
                                        "relative cursor-pointer group transition-all duration-300",
                                        "hover:bg-muted/60 active:bg-muted/80",
                                        "border-r border-border/30 last:border-r-0",
                                        showBorders && "border-r border-border/40"
                                    )}
                                    style={{ 
                                        padding: `${Number(config.cellPadding) * 4}px`,
                                        fontSize: `${Number(config.fontSize)}rem`
                                    }}
                                    data-key={heading.key}
                                    data-sort-by={heading.sort}
                                    onClick={handleSort}
                                    onMouseEnter={() => setHoveredColumn(heading.key)}
                                    onMouseLeave={() => setHoveredColumn(null)}
                                >
                                    {/* Column hover highlight */}
                                    {showHoverEffects && hoveredColumn === heading.key && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5 rounded-md"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}

                                    {/* Shimmer effect on hover */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                                        transition={{
                                            x: {
                                                duration: 0.8,
                                                ease: "easeInOut"
                                            }
                                        }}
                                    />

                                    <AnimatedContent
                                        tableId={tableId}
                                        changeKey={`${heading.label}_${heading.sort}`}
                                        animationVariant={animationVariant}
                                        content={
                                            <Flex
                                                gap="2"
                                                justify="between"
                                                align="center"
                                                className="relative z-10"
                                            >
                                                <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                                    {heading.label}
                                                </span>
                                                <motion.div
                                                    className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    {heading.sort === "asc" ? (
                                                        <TriangleUpIcon className="h-4 w-4" />
                                                    ) : (
                                                        <TriangleDownIcon className="h-4 w-4" />
                                                    )}
                                                </motion.div>
                                            </Flex>
                                        }
                                    />
                                </TableR.ColumnHeaderCell>
                            ))}
                        </TableR.Row>
                    </TableR.Header>

                    {/* Enhanced Body */}
                    <TableR.Body>
                        <AnimatePresence mode="wait"> {/* Changed from popLayout to wait */}
                            {data.map((value, rowIndex) => {
                                // FIXED: Create stable key based on row content
                                const stableKey = createRowKey(value, rowIndex, headings, rowKeyExtractor);
                                
                                return (
                                    <motion.tr
                                        key={stableKey} // FIXED: Using stable key instead of rowIndex
                                        className={cn(
                                            "relative group transition-all duration-300",
                                            "hover:bg-muted/30 border-b border-border/20",
                                            showStripes && rowIndex % 2 === 1 && "bg-muted/20",
                                            showHoverEffects && "hover:shadow-md hover:shadow-primary/10",
                                            "hover:scale-[1.01] hover:z-10"
                                        )}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ 
                                            duration: 0.3,
                                            delay: rowIndex * 0.02, // Reduced delay for smoother animation
                                            ease: [0.4, 0, 0.2, 1]
                                        }}
                                        onMouseEnter={() => showHoverEffects && setHoveredRow(rowIndex)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                        whileHover={{
                                            scale: showHoverEffects ? 1.005 : 1,
                                            transition: { duration: 0.2 }
                                        }}
                                        layout // Added layout animation for smooth repositioning
                                    >
                                        {/* Row hover glow effect */}
                                        {showHoverEffects && hoveredRow === rowIndex && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-lg"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        )}

                                        {/* Row shimmer effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                                            transition={{
                                                x: {
                                                    duration: 1,
                                                    ease: "easeInOut"
                                                }
                                            }}
                                        />

                                        {headings.map((heading) => (
                                            <TableR.Cell
                                                key={`${stableKey}-${heading.key}`} // FIXED: More specific cell key
                                                className={cn(
                                                    "relative transition-all duration-300",
                                                    "border-r border-border/20 last:border-r-0",
                                                    showBorders && "border-r border-border/30"
                                                )}
                                                style={{ 
                                                    padding: `${Number(config.cellPadding) * 4}px`,
                                                    fontSize: `${Number(config.fontSize) * 0.9}rem`
                                                }}
                                            >
                                                <AnimatedContent
                                                    tableId={tableId}
                                                    changeKey={`${stableKey}-${heading.key}-${value[heading.key]}`}
                                                    animationVariant={animationVariant}
                                                    content={
                                                        <div className="relative z-10">
                                                            {value[heading.key]}
                                                        </div>
                                                    }
                                                />
                                            </TableR.Cell>
                                        ))}
                                    </motion.tr>
                                );
                            })}
                        </AnimatePresence>
                    </TableR.Body>
                </TableR.Root>
            </div>
        </motion.div>
    );
}

function TableRowHeadings({
    headings,
    data,
    applySort,
    variant = "surface",
    size = "md",
    animationVariant = "fade",
    showHoverEffects = true,
    showStripes = true,
    showBorders = true,
    glowEffect = false,
    rowKeyExtractor
}: TableProps): React.ReactNode {
    const tableId = useId();
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    animationCount[tableId] = 0;

    const sizeConfig = {
        sm: { tableSize: "1", cellPadding: "2", fontSize: "1" },
        md: { tableSize: "2", cellPadding: "3", fontSize: "2" },
        lg: { tableSize: "3", cellPadding: "4", fontSize: "3" }
    };

    const config = sizeConfig[size];

    const handleSort: React.MouseEventHandler<HTMLElement> = useCallback(
        ev => {
            const target = ev.currentTarget;
            const key = target.getAttribute("data-key") as string;
            const currentSortValue = target.getAttribute(
                "data-sort-by",
            ) as TableSortBy;

            applySort(key, currentSortValue === "asc" ? "desc" : "asc");
        },
        [applySort],
    );

    return (
        <motion.div
            className="relative overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Premium glow effect */}
            {glowEffect && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

            <div className="relative overflow-hidden rounded-xl backdrop-blur-sm border border-border/40 shadow-lg shadow-black/5 dark:shadow-white/5">
                <TableR.Root
                    variant={variant}
                    size={config.tableSize as any}
                    className="w-full"
                >
                    <TableR.Body>
                        <AnimatePresence mode="wait"> {/* Changed from popLayout to wait */}
                            {headings.map((heading, headingIndex) => (
                                <motion.tr
                                    key={heading.key} // This is fine as heading keys should be stable
                                    className={cn(
                                        "relative group transition-all duration-300",
                                        "border-b border-border/20",
                                        showStripes && headingIndex % 2 === 1 && "bg-muted/20",
                                        showHoverEffects && "hover:bg-muted/30 hover:shadow-md hover:shadow-primary/10"
                                    )}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ 
                                        duration: 0.3,
                                        delay: headingIndex * 0.05,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    onMouseEnter={() => showHoverEffects && setHoveredRow(headingIndex)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    layout // Added layout animation for smooth repositioning
                                >
                                    {/* Row hover effect */}
                                    {showHoverEffects && hoveredRow === headingIndex && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}

                                    <TableR.ColumnHeaderCell
                                        className={cn(
                                            "relative cursor-pointer group/header transition-all duration-300",
                                            "bg-gradient-to-r from-muted/50 to-muted/80 backdrop-blur-sm",
                                            "hover:from-muted/60 hover:to-muted/90",
                                            "border-r border-border/60",
                                            showBorders && "border-r-2 border-border/60"
                                        )}
                                        style={{
                                            padding: `${Number(config.cellPadding) * 4}px`,
                                            fontSize: `${Number(config.fontSize)}rem`,
                                            minWidth: "150px"
                                        }}
                                        data-key={heading.key}
                                        data-sort-by={heading.sort}
                                        onClick={handleSort}
                                    >
                                        {/* Header shimmer effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                                            animate={{
                                                x: hoveredRow === headingIndex ? ["-100%", "100%"] : "-100%"
                                            }}
                                            transition={{
                                                x: {
                                                    duration: 0.8,
                                                    ease: "easeInOut"
                                                }
                                            }}
                                        />

                                        <AnimatedContent
                                            tableId={tableId}
                                            changeKey={`${heading.label}_${heading.sort}`}
                                            animationVariant={animationVariant}
                                            content={
                                                <Flex
                                                    gap="2"
                                                    justify="between"
                                                    align="center"
                                                    className="relative z-10"
                                                >
                                                    <span className="font-semibold text-foreground group-hover/header:text-primary transition-colors duration-300">
                                                        {heading.label}
                                                    </span>
                                                    <motion.div
                                                        className="text-muted-foreground group-hover/header:text-primary transition-colors duration-300"
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        {heading.sort === "asc" ? (
                                                            <TriangleUpIcon className="h-4 w-4" />
                                                        ) : (
                                                            <TriangleDownIcon className="h-4 w-4" />
                                                        )}
                                                    </motion.div>
                                                </Flex>
                                            }
                                        />
                                    </TableR.ColumnHeaderCell>

                                    {data.map((value, dataIndex) => {
                                        // FIXED: Create stable key for data cells
                                        const cellKey = createRowKey(value, dataIndex, [heading], rowKeyExtractor);
                                        
                                        return (
                                            <TableR.Cell
                                                key={`${heading.key}-${cellKey}`}
                                                className={cn(
                                                    "relative transition-all duration-300",
                                                    "border-r border-border/20",
                                                    showBorders && "border-r border-border/30"
                                                )}
                                                style={{ 
                                                    padding: `${Number(config.cellPadding) * 4}px`,
                                                    fontSize: `${Number(config.fontSize) * 0.9}rem`
                                                }}
                                            >
                                                <AnimatedContent
                                                    tableId={tableId}
                                                    changeKey={`${cellKey}-${heading.key}-${value[heading.key]}`}
                                                    animationVariant={animationVariant}
                                                    content={
                                                        <div className="relative z-10">
                                                            {value[heading.key]}
                                                        </div>
                                                    }
                                                />
                                            </TableR.Cell>
                                        );
                                    })}
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </TableR.Body>
                </TableR.Root>
            </div>
        </motion.div>
    );
}

function AnimatedContent({
    content,
    changeKey,
    tableId,
    animationVariant = "fade"
}: {
    content: React.ReactNode;
    changeKey: string;
    tableId: string;
    animationVariant?: keyof typeof contentAnimations;
}): React.ReactNode {
    const controls = useAnimation();
    const animation = contentAnimations[animationVariant];

    useEffect(() => {
        controls.set({ 
            ...animation.initial,
            transition: { duration: 0, delay: 0 } 
        });
        
        controls.start({
            ...animation.animate,
            transition: {
                ...animation.transition,
                delay: animationCount[tableId] * 0.01, // Reduced delay further
            },
        });
        
        animationCount[tableId]++;
    }, [changeKey, tableId, controls, animation]);

    return (
        <motion.div
            initial={animation.initial}
            animate={controls}
            className="transform-gpu will-change-transform"
        >
            {content}
        </motion.div>
    );
}

export function Table({
    accentColor,
    grayColor,
    panelBackground,
    scaling,
    radius,
    appearance,
    style,
    className,
    currentPage,
    totalPages,
    onPageChange,
    headingVariant = "column",
    size = "md",
    animationVariant = "fade",
    showHoverEffects = true,
    showStripes = true,
    showBorders = true,
    glowEffect = false,
    rowKeyExtractor, // Pass through the new prop
    ...props
}: TableProps & {
    accentColor?: ThemeProps["accentColor"];
    grayColor?: ThemeProps["grayColor"];
    panelBackground?: ThemeProps["panelBackground"];
    scaling?: ThemeProps["scaling"];
    radius?: ThemeProps["radius"];
    appearance?: ThemeProps["appearance"];
    style?: React.CSSProperties;
    className?: string;
} & PaginationProps): React.ReactNode {
    const tableComponent =
        headingVariant === "row" ? (
            <TableRowHeadings 
                {...props} 
                size={size}
                animationVariant={animationVariant}
                showHoverEffects={showHoverEffects}
                showStripes={showStripes}
                showBorders={showBorders}
                glowEffect={glowEffect}
                rowKeyExtractor={rowKeyExtractor}
            />
        ) : (
            <TableColumnHeadings 
                {...props} 
                size={size}
                animationVariant={animationVariant}
                showHoverEffects={showHoverEffects}
                showStripes={showStripes}
                showBorders={showBorders}
                glowEffect={glowEffect}
                rowKeyExtractor={rowKeyExtractor}
            />
        );

    return (
        <Theme
            style={style}
            className={cn("w-full", className)}
            accentColor={accentColor}
            grayColor={grayColor}
            panelBackground={panelBackground}
            scaling={scaling}
            radius={radius}
            appearance={appearance}
        >
            <motion.div
                className="w-full space-y-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    gap="4"
                    className="w-full"
                >
                    {tableComponent}
                    <EnhancedPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </Flex>
            </motion.div>
        </Theme>
    );
}

// Enhanced Pagination Component (unchanged)
function EnhancedPagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const handleFirstPage = useCallback(() => {
        if (currentPage > 1) {
            onPageChange(1);
        }
    }, [currentPage, onPageChange]);

    const handlePreviousPage = useCallback(() => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }, [currentPage, onPageChange]);

    const handleNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }, [currentPage, totalPages, onPageChange]);

    const handleLastPage = useCallback(() => {
        if (currentPage < totalPages) {
            onPageChange(totalPages);
        }
    }, [currentPage, totalPages, onPageChange]);

    if (totalPages <= 1) return null;

    return (
        <motion.div
            className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 backdrop-blur-sm border border-border/40 shadow-lg shadow-black/5 dark:shadow-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <motion.button
                className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg",
                    "bg-gradient-to-br from-background to-muted/20 shadow-md",
                    "border border-border/40 transition-all duration-300",
                    "hover:shadow-lg hover:scale-105 active:scale-95",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                    currentPage === 1 
                        ? "text-muted-foreground" 
                        : "text-foreground hover:text-primary hover:border-primary/40"
                )}
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                aria-label="First page"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
            </motion.button>

            <motion.button
                className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg",
                    "bg-gradient-to-br from-background to-muted/20 shadow-md",
                    "border border-border/40 transition-all duration-300",
                    "hover:shadow-lg hover:scale-105 active:scale-95",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                    currentPage === 1 
                        ? "text-muted-foreground" 
                        : "text-foreground hover:text-primary hover:border-primary/40"
                )}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                aria-label="Previous page"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </motion.button>

            <motion.div
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                <span className="text-sm font-medium text-foreground">
                    Page {currentPage} of {totalPages}
                </span>
            </motion.div>

            <motion.button
                className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg",
                    "bg-gradient-to-br from-background to-muted/20 shadow-md",
                    "border border-border/40 transition-all duration-300",
                    "hover:shadow-lg hover:scale-105 active:scale-95",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                    currentPage === totalPages 
                        ? "text-muted-foreground" 
                        : "text-foreground hover:text-primary hover:border-primary/40"
                )}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                aria-label="Next page"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </motion.button>

            <motion.button
                className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg",
                    "bg-gradient-to-br from-background to-muted/20 shadow-md",
                    "border border-border/40 transition-all duration-300",
                    "hover:shadow-lg hover:scale-105 active:scale-95",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                    currentPage === totalPages 
                        ? "text-muted-foreground" 
                        : "text-foreground hover:text-primary hover:border-primary/40"
                )}
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                aria-label="Last page"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </motion.button>
        </motion.div>
    );
}
