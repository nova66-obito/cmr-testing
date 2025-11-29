import React from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  Tag,
} from 'lucide-react';
export default function LeadActivity() {
    const activities = [
        {
            type: 'call',
            title: 'Outbound Call',
            time: '2 hours ago',
            description: 'Discussed product features. Customer showed interest in premium plan.',
            duration: '8:32',
        },
        {
            type: 'email',
            title: 'Email Sent',
            time: '1 day ago',
            description: 'Sent product brochure and pricing details',
            status: 'Opened',
        },
        {
            type: 'whatsapp',
            title: 'WhatsApp Message',
            time: '2 days ago',
            description: 'Initial greeting and introduction',
            status: 'Read',
        },
        {
            type: 'note',
            title: 'Note Added',
            time: '3 days ago',
            description: 'Lead qualified - High intent, budget confirmed',
            author: 'Karthik',
        },
    ];
    return (
        <>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                        <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.type === 'call'
                                ? 'bg-green-50 text-green-600'
                                : activity.type === 'email'
                                    ? 'bg-blue-50 text-blue-600'
                                    : activity.type === 'whatsapp'
                                        ? 'bg-green-50 text-green-600'
                                        : 'bg-gray-50 text-gray-600'
                                }`}
                        >
                            {activity.type === 'call' && <Phone className="w-5 h-5" />}
                            {activity.type === 'email' && <Mail className="w-5 h-5" />}
                            {activity.type === 'whatsapp' && <MessageSquare className="w-5 h-5" />}
                            {activity.type === 'note' && <Tag className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                </div>
                                {activity.duration && (
                                    <span className="inline-block px-2 py-1 border border-gray-300 rounded-lg text-xs mt-2 sm:mt-0">
                                        {activity.duration}
                                    </span>
                                )}
                                {activity.status && (
                                    <span className="inline-block px-2 py-1 bg-green-50 text-green-600 rounded-lg text-xs mt-2 sm:mt-0">
                                        {activity.status}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{activity.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}