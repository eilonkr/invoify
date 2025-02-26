import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

// ShadCn
import { Skeleton } from "@/components/ui/skeleton";

// Types
import { InvoiceType } from "@/types";
import type { Language } from "@/app/translations/invoice";

interface InvoiceTemplateProps extends InvoiceType {
    language?: Language;
}

const DynamicInvoiceTemplateSkeleton = () => {
    return <Skeleton className="min-h-[60rem]" />;
};

const DynamicInvoiceTemplate = (props: InvoiceType) => {
    // Get current locale from URL params
    const params = useParams();
    const currentLocale = params.locale?.toString() || 'en';

    // Dynamic template component name
    const templateName = `InvoiceTemplate${props.details.pdfTemplate}`;

    const DynamicInvoice = useMemo(
        () =>
            dynamic<InvoiceTemplateProps>(
                () =>
                    import(
                        `@/app/components/templates/invoice-pdf/${templateName}`
                    ),
                {
                    loading: () => <DynamicInvoiceTemplateSkeleton />,
                    ssr: false,
                }
            ),
        [templateName]
    );

    return <DynamicInvoice {...props} language={currentLocale as Language} />;
};

export default DynamicInvoiceTemplate;
